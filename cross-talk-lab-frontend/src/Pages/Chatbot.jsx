import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { backendRequest } from "../Helpers/backendRequest";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { IconSend2 } from "@tabler/icons-react";
import { Loading } from "../Components/Loading";

export function Message({ type, content }) {
    return (
        <div className={`flex ${type == "received" ? "justify-start" : "justify-end"}`}>
            <div className={`p-3 rounded lg:max-w-[600px] max-w-full  ${type == "received" ? "bg-slate-200" : "bg-sky-300"}`}>{content}</div>
        </div>
    );
}

export function Chatbot() {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    const messageContainer = useRef(null);

    useEffect(() => {
        let ignore = false;

        (async () => {
            const response = await backendRequest("get", `/chats/${id}`);
            if (!ignore) setMessages(response.messages);
        })();

        return () => ignore = true;
    }, []);

    useEffect(() => {
        if (messageContainer.current)
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }, [messages]);

    async function processQuestion(e) {
        e.preventDefault();

        setLoadingMessage(true);

        const responsePromise = backendRequest("post", "/answer-question", {
            chatId: id,
            question
        });

        setMessages(old => [...old, { id: Math.random(), type: "sent", content: question }]);
        setQuestion("");

        const response = await responsePromise;
        setMessages(old => [...old, { id: Math.random(), type: "received", content: response.answer }]);

        setLoadingMessage(false);
    }

    return (
        <Layout title="Chat">
            <div className="h-[calc(100vh-150px)] overflow-auto flex flex-col gap-3 p-3" ref={messageContainer}>
                {messages.map(message =>
                    <Message key={message.id} {...message} />
                )}
                {
                    loadingMessage &&
                    <Message type="received" content={<Loading />} />
                }
            </div>
            <form className="flex" onSubmit={processQuestion}>
                <Input placeholder="Ask Question..." onChange={e => setQuestion(e.target.value)} value={question} />
                <Button>
                    <IconSend2 />
                </Button>
            </form>
        </Layout>
    );
}