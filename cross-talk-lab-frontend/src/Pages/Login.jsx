import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { backendRequest } from "../Helpers/backendRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        setLoading(true)
        const credentials = new FormData(e.target);
        if(e.target.email || e.target.password){
            console.log('Please fill the Information')
            return;
        }
        const response = await backendRequest("POST", "/login", credentials);
        if (response.success) navigate("/");
        else setInvalid(true);
    }

    return (
        <form className="h-[100vh] w-[100vw] bg-slate-200 flex items-center justify-center" onSubmit={login}>

            <div className="w-[450px] max-w-full bg-white rounded p-6">
                <h1 className="text-center text-3xl mb-3">Login</h1>

                {invalid && <div className="bg-red-300 p-3 rounded-md my-3">Invalid Credentials</div>}

                <Input className="mb-3" label="Email" name="email" type="text" autoComplete="email" />
                <Input className="mb-3" label="Password" name="password" type="password" autoComplete="current-password" />

                <div className="text-end">
                    <Button disabled={loading}>{loading ? "Loading..." : "Login"}</Button>
                </div>
            </div>

        </form>
    );
}