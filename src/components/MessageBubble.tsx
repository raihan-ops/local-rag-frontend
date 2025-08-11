export default function MessageBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-white border text-black'}`}>
        <pre className="whitespace-pre-wrap">{text}</pre>
      </div>
    </div>
  );
}
