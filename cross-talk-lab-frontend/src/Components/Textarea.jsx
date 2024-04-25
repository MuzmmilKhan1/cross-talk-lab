export function Textarea({ label, name, type = "text", className, ...attributes }) {
    return (
        <>
            <label className="block pb-1" htmlFor={name}>{label}</label>
            <textarea 
                type={type} 
                className={`block rounded p-2 w-full border-b-2 h-44 focus:border-b-sky-600 outline-none bg-transparent ${className}`}
                name={name} 
                id={name} 
                {...attributes} />
        </>
    );
}