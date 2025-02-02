import "./App.css";
import Chat from "./pages/chat";
import { WebsocketProvider } from "./websocketProvider";

function App() {
    return (
        <WebsocketProvider>
            <Chat />
        </WebsocketProvider>
    );
}

export default App;
