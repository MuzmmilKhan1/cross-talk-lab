import React from 'react'

export default function LogsCard({ name, url, error_message }) {
    return (
    <a
    class="block mb-2
    p-6 bg-white border
    border-gray-200 rounded-lg
    shadow hover:bg-gray-100 cursor-auto">

    <h5 
    class="mb-2 text-2xl font-bold 
    tracking-tight text-gray-900">
        {name}</h5>
    <p class="font-normal 
    text-gray-700 
    dark:text-gray-400">
        URL: {url}<br />
        Error: {error_message}</p>
    </a>
    )
}
