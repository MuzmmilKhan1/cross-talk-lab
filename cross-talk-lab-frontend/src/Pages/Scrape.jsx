import { useState } from "react";
import { Layout } from "../Components/Layout";
import { backendRequest } from "../Helpers/backendRequest";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export function Scrape() {

    const [status, setStatus] = useState("");
    const [status2, setStatus2] = useState("");

    async function scrape(e) {
        e.preventDefault();
        setStatus("Loading...");

        const body = new FormData(e.target)
        const response = await backendRequest("post", "/scrape", body);

        if (response.success)
            setStatus("Scrapped and saved in vector database.");
        else
            setStatus("There was an Error");
    }

    async function uploadFile(e) {
        e.preventDefault();
        setStatus2("Loading...");

        const body = new FormData(e.target);
        body.append('name', body.get('filename'));
        const response = await backendRequest("post", "/save-file", body, true);

        if (response.success)
            setStatus2("File is saved in vector database.");
        else
            setStatus2("There was an Error");
    }

    return (
        <>
            <Layout title="Scrape Website">

                <form className="max-w-md mx-auto p-4" onSubmit={scrape}>
                    <Input
                        placeholder="Name"
                        name="name"
                        label="Name"
                        className="mb-6"
                        autoComplete="off" />

                    <Input
                        placeholder="Enter URL"
                        name="url"
                        label="URL"
                        className="mb-6"
                        autoComplete="off" />

                    <Button>Scrape</Button>

                    <p className="my-6">{status}</p>
                </form>

                <h1 className="text-2xl font-semibold">Upload File</h1>

                <form className="max-w-md mx-auto p-4" onSubmit={uploadFile}>
                    <Input
                        placeholder="Name"
                        name="filename"
                        label="Name"
                        className="mb-6"
                        autoComplete="off" />

                    <Input
                        type="file"
                        label="Upload Document"
                        className="mb-6"
                        name="file"
                        accept=".txt,.docx,.pdf" />

                    <Button>Get Content</Button>

                    <p className="my-6">{status2}</p>
                </form>

            </Layout>
        </>
    );
}