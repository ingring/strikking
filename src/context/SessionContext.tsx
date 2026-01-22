import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

// The context will hold the session object or null
const SessionContext = createContext<Session | null>(null);

// Custom hook to use the session in any component
export const useSession = () => useContext(SessionContext);

export default SessionContext;
