export function Button({ className = "", children, labelButton = false, disabled = false, active = false, ...args }) {
    const classes = 'inline-block rounded bg-sky-600 hover:bg-sky-700' +
        ' disabled:bg-sky-300 disabled:cursor-not-allowed aria-disabled:bg-sky-300' +
        ' aria-disabled:cursor-not-allowed text-white py-3 cursor-pointer px-4' +
        ` ${active ? 'bg-sky-700' : ''} ${className}`;

    return (
        labelButton
            ?
            <label className={classes} {...args} aria-disabled={disabled}>{children}</label>
            :
            <button className={classes} {...args} disabled={disabled}>{children}</button>
    );
}