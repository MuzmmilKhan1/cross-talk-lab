import React, { useState, useEffect } from 'react'
import { Layout } from '../Components/Layout'
import LogsCard from '../Components/LogsCard'
import { backendRequest } from '../Helpers/backendRequest';

export default function Logs() {
    const [errorLogs, setErrorLogs] = useState([]);

    useEffect(() => {
        let ignore = false;

        (async () => {
            const response = await backendRequest("get", "/error-logs");
            if (!ignore) {
                setErrorLogs(response);
            }
        })();

        return () => ignore = true;
    }, []);
  return (
    <Layout title="Error Logs">
        {errorLogs.map((e)=>
        <LogsCard 
        name={e.name} 
        url={e.url} 
        error_message={e.error_message} />
    )}
    </Layout>
  )
}
