import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      
      const res = await fetch("http://localhost:5012/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      } else if (data.responses && Array.isArray(data.responses)) {
        
        const combinedText = data.responses
          .map((r) => {
            const analysis = r.analysis ? `Analysis: ${r.analysis}` : '';
            const trend = r.trend ? `\nTrend: ${r.trend}` : '';
            return `${analysis}${trend}`;
          })
          .join('\n---\n'); 
        
        if (combinedText.trim()) {
             setMessages((prev) => [...prev, { sender: "bot", text: combinedText }]);
        }
       
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: Received an invalid or empty response format." },
        ]);
      }

    } catch (err) {
      console.error("Chatbot API Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to reach FinAI service. Please check your network connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="font-sans">
     
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-[100] 
                   bg-amber-400 hover:bg-amber-300 text-gray-900"
        title={open ? "Close Chat" : "Open Chat"}
      >
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 256 256"
        >
          <path 
            fill="currentColor" 
            d="M232 64v128a16 16 0 0 1-16 16H83l-32.6 28.16l-.09.07A15.9 15.9 0 0 1 40 240a16.05 16.05 0 0 1-6.79-1.52A15.84 15.84 0 0 1 24 224V64a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16"/>
        </svg>
      </button>

      
      {open && (
        <div className="fixed bottom-24 right-6 
                        bg-gray-900 text-white 
                        shadow-2xl rounded-xl 
                        w-[22rem] sm:w-[26rem] md:w-[28rem] h-[36rem] 
                        flex flex-col border border-amber-400/50 
                        transition-all duration-300 ease-in-out z-50">
          
         
          <div className="bg-gray-800 p-4 rounded-t-xl text-center shadow-lg border-b border-amber-400/50">
            <h1 className="text-xl font-bold text-amber-400 tracking-wider">
              FinAI Professional Assistant
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Ask about market analysis and trends.
            </p>
          </div>

         
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 p-10">
                    <p>Welcome! How can I assist with your financial queries today?</p>
                </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-xl shadow-md text-sm transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-amber-400 text-gray-900 rounded-br-none font-medium" 
                      : "bg-gray-700 text-gray-100 rounded-tl-none whitespace-pre-wrap" 
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-400 px-4 py-3 rounded-xl shadow-md text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input and Send Area */}
          <div className="p-4 flex border-t border-amber-400/20">
            <input
              className="flex-1 border-2 rounded-lg p-3 text-sm transition-colors duration-200 
                         bg-gray-800 text-gray-200 border-gray-700 focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80
                         placeholder:text-gray-500 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a financial question..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="ml-3 px-4 py-2 flex items-center justify-center rounded-lg shadow-md 
                         bg-amber-400 text-gray-900 font-semibold transition-all duration-200 
                         hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send Message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

     
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d97706; /* amber-600 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b; /* amber-500 */
        }
      `}</style>
    </div>
  );
}
