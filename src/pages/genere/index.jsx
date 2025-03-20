import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./genere.module.css";
import GameCard from "../../components/GameCard";
import { useEffect } from "react";


export default function Genre() {
  const { genre } = useParams();
  const initialUrl = `https://api.rawg.io/api/games?key=4325697e08ae47af9f63f693271a8c3a&genres=${genre}&page=3`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [genre]);

  return (
    <div className={styles.main}>
      <div className={styles.games}>
        <div className={styles.heading}>
          <h1>{genre} Games</h1>
          <p>vedi quanti giochi  </p>
        </div>
        {error && <h1>{error}</h1>}
        <div className={styles.games_wrapper}>
          {data &&
            data.results.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
}
