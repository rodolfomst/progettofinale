import { useState, useEffect, useContext } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";
import FavContext from "./FavContext";

export default function FavContextProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [fav, setFav] = useState([]);
  const [error, setError] = useState(null);

  const readFav = async () => {
    if (!session || !session.user) {
      return;
    }

    try {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", session.user.id);

      if (error) {
        setError(error.message);
        console.log(error);
      } else {
        setFav(favourites);
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      readFav();
    }
  }, [session]);

  return (
    <FavContext.Provider value={{ fav, setFav, error }}>
      {children}
    </FavContext.Provider>
  );
}
