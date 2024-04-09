import { IconContainer, IconMessageChatbot, IconQuestionMark } from "@tabler/icons-react";
import { InfoCard } from "../Components/InfoCard";
import { Layout } from "../Components/Layout";
import { useEffect, useState } from "react";
import { backendRequest } from "../Helpers/backendRequest";

export function Dashboard() {
    const [statistics, setStatistics] = useState({  });

    useEffect(() => {
        let ignore = false;

        (async () => {
            const response = await backendRequest("get", "/statistics");
            if (!ignore) setStatistics(response);
        })();

        return () => ignore = true;
    }, []);

    return (
        <>
            <Layout title="Dashboard">
                <div className="flex gap-3">
                    <InfoCard icon={<IconContainer />} content={statistics.scrappedPages} label="Pages Scrapped" />
                    <InfoCard icon={<IconMessageChatbot />} content={statistics.chats} label="Chats" />
                    <InfoCard icon={<IconQuestionMark />} content={statistics.questionsAsked} label="Questions Asked" />
                </div>
            </Layout>
        </>
    );
}