import './App.css'
import Strikkeprosjekter from "./sider/Strikkeprosjekt.tsx";
import Login from "./sider/Login.tsx";
import {supabase} from "./lib/supabase.ts";
import {useEffect, useState} from "react";
import SessionContext from "./context/SessionContext.tsx";
import {Button} from "@navikt/ds-react";

export default function App() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    if (!session) {
        return <Login/>
    }

    return (
        <>
            <SessionContext.Provider value={session}>
            <Button
                onClick={() => supabase.auth.signOut()}
                data-color="neutral"
                className="mt-4 text-white px-4 py-2 rounded"
            >
                Log out
            </Button>
            <Strikkeprosjekter/>
            </SessionContext.Provider>
        </>
    );
}