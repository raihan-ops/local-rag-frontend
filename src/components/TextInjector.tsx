import { useState } from 'react';

export default function TextInjector({ onInject }: { onInject: (text: string) => void }) {
    const [text, setText] = useState('');

    return (
        <div className="p-2">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste large text here"
                className="w-full h-28 p-2 border"
            />
            <div className="flex gap-2 mt-2">
                <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => {
                        onInject(text);
                        setText('');
                    }}
                >
                    Inject
                </button>
                <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setText('')}>
                    Clear
                </button>
            </div>
        </div>
    );
}
