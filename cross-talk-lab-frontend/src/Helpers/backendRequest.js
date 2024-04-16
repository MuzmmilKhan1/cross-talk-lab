import { API_BASE_URL } from "./constants";

export async function backendRequest(method, url, body, multipart = false) {
    url = API_BASE_URL + url;

    if (multipart) {
        const response = await fetch(url, { method, body });
        return await response.json();
    }

    if (body instanceof FormData) {
        body = JSON.stringify(
            Object.fromEntries(body)
        );
    } else if (typeof body === "object") {
        body = JSON.stringify(body);
    }

    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method, body, headers, credentials: 'include' });
    return await response.json();
}