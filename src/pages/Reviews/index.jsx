import styles from "./review.module.css";
import { useParams, Link } from "react-router";
import { Toaster, toast } from "sonner";
import useFetchSolution from "../../hooks/useFetchSolution";
import supabase from "../../supabase/client";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";

export default function Review() {
  const { id } = useParams();
  const { session } = useContext(SessionContext);

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=4325697e08ae47af9f63f693271a8c3a`;

  const { loading, data: game, error } = useFetchSolution(initialUrl);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!session) {
      toast.error("Devi essere loggato per lasciare una recensione! 😡");
      return;
    }

    const review = event.currentTarget;
    const { title, content } = Object.fromEntries(new FormData(review));

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          review_title: title,
          review_content: content,
          game_id: Number(id),
          profile_id: session.user.id, // Usa 'profile_id' invece di 'user_id'
        },
      ]);

    if (error) {
      console.error("Errore Supabase:", error.message);
      toast.error(`Errore: ${error.message} 😡`);
    } else {
      review.reset();
      toast.success("Recensione caricata correttamente 🥰");
    }
  };

  return (
    <div className={styles.review_block}>
      {loading && (
        <img
          style={{ width: "100%", height: "100vh" }}
          alt="loading"
          id="loadingImages"
          src="https://i.imgur.com/LVHmLnb.gif"
        />
      )}
      {error && <h1>{error}</h1>}

      {game && (
        <>
          <h1>
            Lascia una recenzione per il gioco:{" "}
            <Link to={`/games/${id}/${game.name}`}>
              {game.name}
            </Link>
          </h1>
          <div style={{ width: "70%" }}>
            <form onSubmit={handleReviewSubmit}>
              <fieldset>
                <label>
                  Titolo della recensione
                  <input name="title" required />
                </label>
                <label>
                  Scrivi la recensione
                  <textarea type="text" name="content" required />
                </label>
              </fieldset>
              <input type="submit" value="Pubblica la recensione" />
            </form>
          </div>
        </>
      )}

      <Toaster position="bottom-center" />
    </div>
  );
}
