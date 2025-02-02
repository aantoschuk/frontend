import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type WSContext = {
    socket: WebSocket | null;
    messages: string[];
    sendMessage: (message: string) => void | undefined;
};

const WebSocketContext = createContext<WSContext | null>(null);

export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    // TODO: Change it later, for now, as chat using just strings as messages, use array of strings
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/chat");

        ws.onmessage = (event) => {
            console.log(event);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onopen = (event) => {
            console.info("WebSocket connected", event);
        };

        ws.onclose = (event) => {
            console.info("WebSocket connections closed", event);
        };

        ws.onerror = (error) => {
            console.error("Error in WebSocket: ", error);
        };

        setSocket(ws);

        return () => {
            socket?.close();
        };
    }, []);

    const value = useMemo(
        () => ({
            socket,
            messages,
            sendMessage: (message: string) => socket?.send(message),
        }),
        [socket, messages],
    );

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
