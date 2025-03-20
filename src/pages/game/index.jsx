import { Link, useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./game.module.css";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";
import FavContext from "../../context/FavContext";
import GameReviews from "./components/GameReviews";
import Chat from './components/Chat';

export default function Game() {
  const { session } = useContext(SessionContext);
  const { fav, setFav } = useContext(FavContext);

  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=4325697e08ae47af9f63f693271a8c3a`;

  const { loading, data: game, error } = useFetchSolution(initialUrl);

  const isFavorite = () => {
    if (game) {
      return fav.find((el) => +el.game_id === game.id);
    }
  };

  // INSERT...
  const addToFav = async (game) => {
    const { error } = await supabase
      .from("favourites")
      .insert([
        {
          profile_id: session.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
    if (error) {
      toast.error("Errore di inserimento nei preferiti 😟");
      readFav();
    } else {
      toast.success("Gioco correttamente inserito nei preferiti 🥰");
      readFav();
    }
  };
  // READ...
  const readFav = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Gioco non trovato 😟");
    } else {
      setFav(favourites);
    }
  };
  // DELETE
  const removeFav = async (game) => {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("game_id", game.id)
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Non hai rimosso correttamente 😟");
      readFav();
    } else {
      toast.success("Gioco rimosso dai preferiti correttamente  🥰");
      readFav();
    }
  };

  return (
    <div className="container">
      {loading && (
        <img
          style={{ width: "100%", height: "100vh" }}
          alt="loading"
        
        />
      )}
      {error && <h1>{error}</h1>}
      <div className={styles.game}>
        <div className={styles.sectionGameImage}>
          <p>{game && game.released}</p>
          <h1>{game && game.name}</h1>
          {session && (
            <div>
              {!isFavorite() ? (
                <button onClick={() => addToFav(game)}>
                  Aggiungi ai preferiti
                </button>
              ) : (
                <button className="secondary" onClick={() => removeFav(game)}>
                  Rimuovi dai preferiti
                </button>
              )}
            </div>
          )}
          <p>Rating: {game && game.rating}</p>
          {session && game && (
            <Link to={`/games/review/${game.id}`}>
              <button className="outline contrast">Lascia una recenzione</button>
            </Link>
          )}
          <p>About:</p>
          <p>{game && game.description_raw}</p>
          <GameReviews game={game} session={session} />
        </div>
        <div className={styles.sectionGameInfo}>
          <img src={game && game.background_image} alt="" />
          {session && (
            <Chat game={game} session={session} />
          )}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}