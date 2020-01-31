import React, { FunctionComponent, useEffect, useState, FormEvent } from 'react';
import './App.scss';
import axios from 'axios';

const App: FunctionComponent = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const chatListener = new EventSource('http://localhost:8080/messages');

        chatListener.onmessage = (event) => {
            setMessages(JSON.parse(event.data));
        };
    }, []);

    const sendMessage = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (newMessage.length) {
            axios.post('http://localhost:8080/send-message', {message: newMessage});
            setNewMessage('');
        }
    };

    return <div className="app">
        <div className="header">
            <h1>Chat app</h1>
        </div>
        <div className="messages">
            {messages.map((message: string, index: number) => <p key={index}>{message}</p>)}
        </div>
        <form noValidate={true} onSubmit={sendMessage}>
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message" />
            <button type="submit">SEND</button>
        </form>
    </div>;
}

export default App;
