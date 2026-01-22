import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase.ts";

export default function Login() {
    return (
        <div className="max-w-2xl mx-auto">
            <Auth
                supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                }}
            />
        </div>
    );
}