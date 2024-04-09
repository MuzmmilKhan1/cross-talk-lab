import { NavLink } from "react-router-dom";

export function SidebarItem({ icon, label, href }) {
    return (
        <NavLink 
            className={({ isActive, isPending }) => {
                let classes = "rounded hover:bg-sky-600 p-3 w-full text-white flex gap-3" ;
                if (isActive) classes += " bg-sky-600";
                return classes;
            }}
            to={href}>
            { icon }
            <div>{ label }</div>
        </NavLink>
    );
}