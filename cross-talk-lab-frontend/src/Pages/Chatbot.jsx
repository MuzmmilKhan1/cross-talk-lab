import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { backendRequest } from "../Helpers/backendRequest";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { IconSend2 } from "@tabler/icons-react";
import { Loading } from "../Components/Loading";
import { parse } from "marked";

export function Message({ type, content }) {
    const [parsedContent, setParsedContent] = useState("");

    useEffect(() => {
        (async () => {
            if (typeof content === "object") return;
            const parsed = await parse(content);
            setParsedContent(parsed);
        })();
    }, []);

    return (
        <div className={`flex ${type == "received" ? "justify-start" : "justify-end"}`}>
            {
                typeof content === "string"
                    ?
                    <div
                        className={`p-3 rounded lg:max-w-[600px] max-w-full message-content ${type == "received" ? "bg-slate-200" : "bg-sky-300"}`}
                        dangerouslySetInnerHTML={{ __html: parsedContent }}></div>
                    :
                    <div
                        className={`p-3 rounded lg:max-w-[600px] max-w-full message-content ${type == "received" ? "bg-slate-200" : "bg-sky-300"}`}
                    >{content}</div>
            }
        </div>
    );
}

export function Chatbot() {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    const messageContainer = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

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
        setIsGenerating(true)

        setLoadingMessage(true);
        if(question === ''){
            setIsGenerating(false)
            setLoadingMessage(false)
            return;
        }
        const responsePromise = backendRequest("post", "/answer-question", {
            chatId: id,
            question
        });

        setMessages(old => [...old, { id: Math.random(), type: "sent", content: question }]);
        setQuestion("");
        setIsGenerating(false);

        const response = await responsePromise;
        setMessages(old => [...old, { id: Math.random(), type: "received", content: response.answer }]);
        setIsGenerating(false);

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
                <Input placeholder="Ask Question..." 
                onChange={e => setQuestion(e.target.value)} value={question} />
                <Button disabled={isGenerating} 
                className={`${isGenerating ? 'py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center' : ""}`}>
                {isGenerating ? 
                <>
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                </>
                :
                <IconSend2 />
                 }
                </Button>
            </form>
        </Layout>
    );
}