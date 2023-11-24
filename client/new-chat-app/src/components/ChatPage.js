import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/ChatPage.css";
import PrimarySearchAppBar from "./nav";
import UsersList from "./UsersList";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3300/api/messages"
            );
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post("http://localhost:3300/api/messages", {
                content: newMessage,
            });
            setNewMessage("");
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        const getAuth = localStorage.getItem("auth");
        const auth = JSON.parse(getAuth);

        if (auth === null) {
            return navigate("/login");
        }

        if (!auth.token) {
            return navigate("/login");
        }

        fetchMessages();
    }, []);

    return (
        <div>
            <PrimarySearchAppBar />

            <div
                className="chat-page"
                style={{ display: "flex", padding: "20px 0" }}
            >
                <UsersList />
                <div>
                    <div className="container">
                        <h2>Chat Page</h2>
                        <div className="messages-container">
                            {messages.map((message) => (
                                <div key={message._id} className="message">
                                    {message.content}
                                </div>
                            ))}
                        </div>
                        <div className="new-message-container">
                            <div className="new-message">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    placeholder="Type your message..."
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
