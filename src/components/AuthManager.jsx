import { useEffect } from "react";
import useLoginStore from "../store/useLoginStore";
import { supabase } from "../api/supabaseClient";

export default function AuthManager() {
  const setUser = useLoginStore((state) => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || "user",
        });
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || "user",
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return null;
}
