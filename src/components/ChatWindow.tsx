import { useState } from 'react';
import MessageBubble from './MessageBubble';
import FileUploader from './FileUploader';
import TextInjector from './TextInjector';
import { chat, resetConversation, injectText } from '../services/api';

interface Message {
    role: string;
    content: string;
    isLoading?: boolean;
}

export default function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Welcome — upload files or paste text and ask questions.' }]);
    const [input, setInput] = useState('');
    const [topK, setTopK] = useState(3);
    const [isLoading, setIsLoading] = useState(false);

    async function send() {
        if (!input.trim() || isLoading) return;
        const userMsg = input.trim();
        setMessages((m) => [...m, { role: 'user', content: userMsg }]);
        setInput('');
        setIsLoading(true);

        // Add loading message
        setMessages((m) => [...m, { role: 'assistant', content: '...', isLoading: true }]);

        try {
            const res = await chat(userMsg, topK);
            
            // Remove loading message
            setMessages((m) => m.filter((msg) => !msg.isLoading));
            
            if (res.error) {
                setMessages((m) => [...m, { role: 'assistant', content: 'Error: ' + res.error }]);
            } else {
                setMessages((m) => [...m, { role: 'assistant', content: res.reply }]);
            }
        } catch {
            // Remove loading message
            setMessages((m) => m.filter((msg) => !msg.isLoading));
            setMessages((m) => [...m, { role: 'assistant', content: 'Error: Failed to get response from server' }]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleInject(text: string) {
        if (!text.trim()) return alert('No text');
        const res = await injectText(text);
        if (res.success) alert('Injected');
        else alert('Inject failed');
    }

    async function handleReset() {
        await resetConversation();
        setMessages([{ role: 'assistant', content: 'Conversation reset.' }]);
    }

    return (
        <div className="flex h-screen">
            <aside className="w-80 border-r p-4">
                <h3 className="font-bold mb-2">Documents</h3>
                <FileUploader />
                <TextInjector onInject={handleInject} />
                <div className="mt-4">
                    <button onClick={handleReset} className="px-3 py-1 bg-red-600 text-white rounded">
                        Reset
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto p-6 bg-[#f3f4f6]">
                    {messages.map((m, i) => (
                        <MessageBubble key={i} role={m.role} text={m.content} isLoading={m.isLoading} />
                    ))}
                </div>

                <div className="p-4 border-t flex gap-3 items-start">
                    <input
                        type="number"
                        value={topK}
                        onChange={(e) => setTopK(Number(e.target.value))}
                        className="w-20 p-2 border"
                        disabled={isLoading}
                    />
                    <textarea
                        className="flex-1 p-2 border"
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                send();
                            }
                        }}
                        disabled={isLoading}
                        placeholder="Type your message..."
                    />
                    <button 
                        className={`px-4 py-2 rounded text-white min-w-[80px] ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`} 
                        onClick={send}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Send'}
                    </button>
                </div>
            </main>
        </div>
    );
}
