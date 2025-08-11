interface MessageBubbleProps {
  role: string;
  text: string;
  isLoading?: boolean;
}

function formatMessageContent(text: string) {
  // Split text by code blocks (```...```)
  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const lines = part.slice(3, -3).split('\n');
      const language = lines[0].trim();
      const code = lines.slice(1).join('\n');
      
      return (
        <div key={index} className="my-3">
          {language && (
            <div className="bg-gray-200 px-3 py-1 text-xs font-mono text-gray-600 rounded-t-md">
              {language}
            </div>
          )}
          <pre className="bg-gray-900 text-green-400 p-4 rounded-b-md overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      );
    } else if (part.includes('`') && !part.startsWith('```')) {
      // Handle inline code
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <span key={index}>
          {inlineParts.map((inlinePart, inlineIndex) => {
            if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
              return (
                <code key={inlineIndex} className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                  {inlinePart.slice(1, -1)}
                </code>
              );
            }
            return inlinePart;
          })}
        </span>
      );
    } else {
      // Regular text
      return <span key={index}>{part}</span>;
    }
  });
}

export default function MessageBubble({ role, text, isLoading }: MessageBubbleProps) {
  const isUser = role === 'user';
  
  if (isLoading) {
    return (
      <div className="flex justify-start mb-3">
        <div className="max-w-[70%] p-3 rounded-lg bg-white border text-black">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-gray-500 text-sm">AI is thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] p-3 rounded-lg ${
        isUser ? 'bg-blue-600 text-white' : 'bg-white border text-black'
      }`}>
        <div className="whitespace-pre-wrap break-words">
          {formatMessageContent(text)}
        </div>
      </div>
    </div>
  );
}
