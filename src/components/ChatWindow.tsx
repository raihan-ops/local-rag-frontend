import { useState } from 'react';
import MessageBubble from './MessageBubble';
import FileUploader from './FileUploader';
import TextInjector from './TextInjector';
import { chat, resetConversation, injectText } from '../services/api';

export default function ChatWindow() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: 'Welcome — upload files or paste text and ask questions.' }]);
    const [input, setInput] = useState('');
    const [topK, setTopK] = useState(3);

    async function send() {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages((m) => [...m, { role: 'user', content: userMsg }]);
        setInput('');

        const res = await chat(userMsg, topK);
        if (res.error) {
            setMessages((m) => [...m, { role: 'assistant', content: 'Error: ' + res.error }]);
        } else {
            setMessages((m) => [...m, { role: 'assistant', content: res.reply }]);
            if (res.retrieved && res.retrieved.length) {
                setMessages((m) => [
                    ...m,
                    {
                        role: 'assistant',
                        content:
                            '\nRetrieved snippets:\n' + res.retrieved.map((r: any) => r.snippet).join('\n---\n'),
                    },
                ]);
            }
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
                        <MessageBubble key={i} role={m.role} text={m.content} />
                    ))}
                </div>

                <div className="p-4 border-t flex gap-3 items-start">
                    <input
                        type="number"
                        value={topK}
                        onChange={(e) => setTopK(Number(e.target.value))}
                        className="w-20 p-2 border"
                    />
                    <textarea
                        className="flex-1 p-2 border"
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={send}>
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
}
