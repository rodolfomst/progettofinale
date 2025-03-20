
import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";

export default function SessionContextProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [session]);

  return (
    <SessionContext.Provider
      value={{
        session,
        user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}