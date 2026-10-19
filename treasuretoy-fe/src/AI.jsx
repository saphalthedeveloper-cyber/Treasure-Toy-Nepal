import { useState } from "react";
const AI = () => {
    const [message, setMessage] = useState("");
    const [aiReply, setAiReply] = useState("");
    const [messages, setMessages] = useState([]);
    const username = localStorage.getItem("username");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const aiRes = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ message })
            });

            if (!aiRes.ok) { throw new Error(`Request failed: ${aiRes.status}`); }
            const aiData = await aiRes.json();
            setAiReply(aiData);
            setMessages((oldMessages) => [
                ...oldMessages,
                { user: message, ai: aiData.reply }
            ])
            setMessage("");
            console.log(messages);
        } catch (error) {
            console.error("Error submitting message:", error);
        }
    };
    return (
        <>
            <div className="container">
                <div className="ai-container">
                    <h1 className="ai-title">TreasureToy AI assistant</h1>
                </div>
                <div className="ai-chat">
                    {messages.length===0 &&(
                         <div className="welcomeai">
                        <h1 className="welcomeai-title" 
                            
                        >Welcome, {username}! How can I help you?</h1>
                    </div>
                    )}
                   
                    <div className="conversation">
                        {messages.map((chat, index) => (
                            <div key={index} className="chat-message">
                                <p className="userchat">{chat.user}</p>
                                <p className="aichat">{chat.ai}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ai-chatbox">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default AI;