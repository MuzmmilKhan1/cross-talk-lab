import { useState } from "react";
import { Layout } from "../Components/Layout";
import { backendRequest } from "../Helpers/backendRequest";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { toast } from 'react-hot-toast';

export function Scrape() {

    const [status, setStatus] = useState("");
    const [status2, setStatus2] = useState("");
    const [loading, setLoading] = useState(false);

    async function scrape(e) {
        e.preventDefault();
        setLoading(true);
        setStatus("Loading...");

        const body = new FormData(e.target)
        let formValues = {}
        for (let [name, value] of body.entries()) {
            formValues[name] = value;
        }
        if(formValues.name === '' || formValues.url === ''){
                setLoading(false);6
                setStatus("");
                toast.error('Please Provide details');
                return;
        }
        const response = await backendRequest("post", "/scrape", body);
        if (response.success){
            setStatus("Scrapped and saved in vector database.");
            setLoading(false);
        }
        else{
            setStatus("There was an Error");
            setLoading(false);
        }
    }

    async function uploadFile(e) {
        e.preventDefault();
        setLoading(true);
        setStatus2("Loading...");

        const body = new FormData(e.target);
        body.append('name', body.get('filename'));
        const response = await backendRequest("post", "/save-file", body, true);
        let formValues = {}
        for (let [name, value] of body.entries()) {
            formValues[name] = value;
        }
        if(formValues.filename === '' || formValues.file === ''){
                setLoading(false);6
                setStatus("");
                toast.error('Please Provide details');
                return;
        }
        if (response.success){
            setStatus2("File is saved in vector database.");
            setLoading(false);
        }
        else{
            setStatus2("There was an Error");
            setLoading(false);
        }
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

                    <div className="flex gap-2 items-center mb-3">
                        <input type="checkbox" name="followLinks" id="followLinks" className="w-4 h-4" />
                        <label htmlFor="followLinks">Follow Links</label>
                    </div>

                    <Button disabled={loading}>{loading ? "Loading..." : "Scrape"}</Button>

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
                        accept=".txt,.docx,.pdf,.bmp,.jpg,.png,.pbm,.webp" />

                    <Button disabled={loading}>{loading ? "Loading..." : "Get Content"}</Button>

                    <p className="my-6">{status2}</p>
                </form>

            </Layout>
        </>
    );
}