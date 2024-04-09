import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { backendRequest } from "../Helpers/backendRequest";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "../Components/Button";

export function Chats() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        (async () => {
            const fetched = await backendRequest("get", "/chats");
            if (!ignore) setChats(fetched);
        })();

        return () => ignore = true;
    }, []);

    return (
        <>
            <Layout title="Chatbot">

                {chats.map(single =>
                    <Link
                        to={`/chats/${single.id}`}
                        className="block p-4 bg-slate-100 hover:bg-slate-200 cursor-pointer w-full rounded-md mb-3"
                        key={single.id}
                    >
                        {single.name}
                    </Link>
                )}

                <div className="text-center">
                    <Button onClick={() => navigate("/new-chat")}>
                        <IconPlus />
                    </Button>
                </div>

            </Layout>
        </>
    );
}