import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SearchGame from "./components/SearchGame";
import GameCard from "../../components/GameCard";
import useFetchSolution from "../../hooks/useFetchSolution";
import styles from "./Home.module.css";
import Navbar from "./components/Navbar"; 

export default function Home() {
  const initialUrl = "https://api.rawg.io/api/genres?key=4325697e08ae47af9f63f693271a8c3a";
  const { games } = useFetchSolution(initialUrl);
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (games.items.length && inView && !games.isLoading) {
      games.loadMore();
    }
  }, [inView, games]);

  return (
    <>
      <Navbar />  
      <div className={styles.main}>
        <div>
          <div className={styles.heading}>
            <div style={{ width: "30%" }}></div>
            <div style={{ width: "50%" }}>
              <SearchGame /> 
            </div>
          </div>
          <div className={styles.games_wrapper}>
            {games &&
              games.items.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
        </div>
      </div>
    </>
  );
}
