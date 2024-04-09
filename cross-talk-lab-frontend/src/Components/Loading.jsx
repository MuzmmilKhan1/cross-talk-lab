import { IconLoader2 } from "@tabler/icons-react";

export function Loading({ className = "" }) {
    return (
        <div>
            <IconLoader2 className={"animate-spin mx-auto h-10 w-10 " + className} />
        </div>
    );
}