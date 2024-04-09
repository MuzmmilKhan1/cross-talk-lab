import { IconContainer, IconDashboard, IconMessageChatbot } from "@tabler/icons-react";
import { SidebarItem } from "./SidebarItem";

export function Layout({ children, title = '' }) {
    return (
        <div className="w-[100vw] h-[100vh] flex">

            <div className="w-72 bg-sky-800 p-2 overflow-auto">
                <div className="font-semibold text-2xl text-center text-white my-20">Cross Talk Lab</div>
                
                <div className="flex flex-col gap-2">
                    <SidebarItem label="Dashboard" href="/" icon={<IconDashboard />} />
                    <SidebarItem label="Scrape" href="/scrape" icon={<IconContainer />} />
                    <SidebarItem label="Chatbot" href="/chats" icon={<IconMessageChatbot />} />
                </div>
            </div>

            <div className="flex-grow p-5 overflow-auto">
                <div className="d-flex justify-between mb-7">
                    <h1 className="text-2xl font-semibold">{ title }</h1>
                </div>

                { children }
            </div>

        </div>
    );
}