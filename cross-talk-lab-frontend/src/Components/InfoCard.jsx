export function InfoCard({ icon, label, content }) {
    return (
        <div className="rounded-md bg-slate-50 flex p-6 w-72">
            <div className="flex-grow">
                <div>{label}</div>
                <div className="text-2xl">{content}</div>
            </div>
            <div className="w-1/3 flex items-center justify-end font-semibold">
                {icon}
            </div>
        </div>
    );
}