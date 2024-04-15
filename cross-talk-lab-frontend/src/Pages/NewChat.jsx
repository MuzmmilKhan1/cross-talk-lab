import { useEffect, useState } from "react";
import { IconSend2 } from "@tabler/icons-react";
import { Select } from "../Components/Select";
import { Layout } from "../Components/Layout";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { backendRequest } from "../Helpers/backendRequest";
import { Loading } from "../Components/Loading";
import { useNavigate } from "react-router-dom";

export function NewChat() {
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [scrapeHistory, setScrapeHistory] = useState([]);
    const [name, setName] = useState("");
    const [vectorDataPath, setVectorDataPath] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        (async () => {
            const response = await backendRequest("get", "/scrape-history");
            if (!ignore) {
                setScrapeHistory(response);
            }
        })();

        return () => ignore = true;
    }, []);

    async function startProcessing(e) {
        e.preventDefault();
        
        setLoadingMessage(true);
        const response1 = await backendRequest("post", "/chats", { name, vectorDataPath });
        const chatId = response1.id;
        await backendRequest("post", "/answer-question", { chatId, question });
        navigate(`/chats/${chatId}`);
        setLoadingMessage(false);
    }

    return (
        <Layout title="Chat">
            <div className="h-[calc(100vh-150px)] overflow-auto flex justify-center items-center p-3">
                {
                    loadingMessage
                        ?
                        <div>
                            <Loading />
                        </div>
                        :
                        <div className="w-96">
                            <Input name="name" label="Chat Name" onChange={e => setName(e.target.value)} value={name} autoComplete="off" className="mb-4" />

                            <Select label="Question About" value={vectorDataPath} onChange={e => setVectorDataPath(e.target.value)} name="vectorDataPath">
                                <option value="">All Documents</option>
                                {scrapeHistory.map(single => 
                                    <option value={single.path} key={single.id}>{ single.name }</option>
                                )}
                            </Select>
                        </div>
                }
            </div>
            <form className="flex" onSubmit={startProcessing}>
                <Input placeholder="Ask Question..." onChange={e => setQuestion(e.target.value)} value={question} name="question" />
                <Button>
                    <IconSend2 />
                </Button>
            </form>
        </Layout>
    );
}