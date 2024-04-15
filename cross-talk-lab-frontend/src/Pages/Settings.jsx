import { useEffect, useState } from "react";
import { Layout } from "../Components/Layout";
import { Input } from "../Components/Input";
import { Select } from "../Components/Select";
import { Button } from "../Components/Button";
import { backendRequest } from "../Helpers/backendRequest";

export function Settings() {
    const [apiKey, setApiKey] = useState("");
    const [model, setModel] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        let ignore = false;

        (async () => {
            const response = await backendRequest("GET", "/openai-settings");
            if (!ignore) {
                setApiKey(response.apiKey);
                setModel(response.model);
            }

        })();

        return () => ignore = true;
    }, []);

    async function saveSettings(e) {
        e.preventDefault();

        setStatus("Saving...");
        const response = await backendRequest("POST", "/openai-settings", { apiKey, model });

        if (response.success) setStatus("Saved");
        else setStatus("Error");
    }

    return (
        <Layout title="Settings">

            <form className="rounded bg-slate-100 overflow-hidden" onSubmit={saveSettings}>
                <div className="p-4 font-bold bg-slate-200">Change API Key</div>
                <div className="p-4">
                    <Input label="API Key" name="apiKey" className="mb-4" onChange={e => setApiKey(e.target.value)} value={apiKey} />
                    <Select label="Model" name="model" className="mb-4" onChange={e => setModel(e.target.value)} value={model} >
                        <option value="gpt-4">GPT 4</option>
                        <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
                    </Select>
                    <div className="text-end">
                        {status && <i className="mr-3">({ status })</i>}
                        <Button>Submit</Button>
                    </div>
                </div>
            </form>

        </Layout>
    );
}