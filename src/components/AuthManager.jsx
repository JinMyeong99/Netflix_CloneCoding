import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";
import { supabase } from "../api/supabaseClient";

export default function AuthManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (user) {
        dispatch(
          loginSlice.actions.setUser({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || "user",
          })
        );
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user) {
        dispatch(
          loginSlice.actions.setUser({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || "user",
          })
        );
      } else {
        dispatch(loginSlice.actions.setUser(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return null;
}
