export function Input({ label, name, type = "text", className, ...attributes }) {
    return (
        <>
            <label className="block pb-1" htmlFor={name}>{label}</label>
            <input 
                type={type} 
                className={`block rounded p-2 w-full border-b-2 focus:border-b-sky-600 outline-none bg-transparent ${className}`}
                name={name} 
                id={name} 
                {...attributes} />
        </>
    );
}