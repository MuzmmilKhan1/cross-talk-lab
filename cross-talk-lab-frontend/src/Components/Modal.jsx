import { IconX } from "@tabler/icons-react";

export function Modal({ title, children, onCancel }) {
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-600 bg-opacity-30 flex justify-center pt-24">

            <div className="w-[600px] max-w-full bg-slate-50 rounded overflow-hidden self-start">
                <div className="flex justify-between bg-slate-100 p-5">
                    <strong>{title}</strong>
                    <IconX onClick={onCancel} className="cursor-pointer" />
                </div>

                <div className="p-5">
                    {children}
                </div>
            </div>

        </div>
    );
}