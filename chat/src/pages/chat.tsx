import { FormEvent, useState } from "react";

import { useWebSocket } from "../websocketProvider";
import { MessageList } from "../components";

const Chat = () => {
    const [message, setMessage] = useState("");

    const connection = useWebSocket();

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();
        // do not send if message an enmpty string
        if (message === "") return;
        connection?.sendMessage(message);
        setMessage("");
    };

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <MessageList messages={connection.messages} />
        </div>
    );
};

export default Chat;
