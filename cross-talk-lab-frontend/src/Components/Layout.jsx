import { IconContainer, IconDashboard, IconMessageChatbot, IconSettings, IconLogs } from "@tabler/icons-react";
import { SidebarItem } from "./SidebarItem";
import { backendRequest } from "../Helpers/backendRequest";
import { useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

export function Layout({ children, title = '' }) {
    const navigate = useNavigate();

    async function logout(e) {
        e.preventDefault();
        await backendRequest("POST", "/logout");
        window.isLoggedIn = false;
        navigate("/login");
    }

    return (
        <div className="w-[100vw] h-[100vh] flex">

            <div className="w-72 bg-sky-800 p-2 overflow-auto">
                <div className="font-semibold text-2xl text-center text-white my-20">----</div>
                
                <div className="flex flex-col gap-2">
                    <SidebarItem label="Dashboard" href="/" icon={<IconDashboard />} />
                    <SidebarItem label="Scrape" href="/scrape" icon={<IconContainer />} />
                    <SidebarItem label="Chatbot" href="/chats" icon={<IconMessageChatbot />} />
                    <SidebarItem label="Logs" href="/logs" icon={<IconLogs />} />
                    <SidebarItem label="Settings" href="/settings" icon={<IconSettings />} />
                </div>
            </div>

            <div className="flex-grow p-5 overflow-auto">
                <div className="flex justify-between mb-7">
                    <h1 className="text-2xl font-semibold">{ title }</h1>
                    <a class="text-gray-900 
                    bg-white border border-gray-300
                    focus:outline-none hover:bg-gray-100
                    focus:ring-4 focus:ring-gray-100 font-medium
                    rounded-full text-sm px-5 py-2.5 me-2 mb-2
                    dark:bg-gray-800 dark:text-white
                    dark:border-gray-600 dark:hover:bg-gray-700
                    dark:hover:border-gray-600
                    dark:focus:ring-gray-700" 
                    onClick={logout}>Logout</a>
                </div>

                { children }
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
}