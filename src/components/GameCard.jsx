import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styles from './gameCard.module.css';

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(game.background_image);

  useEffect(() => {
    if (!game.background_image) {
      fetch(`https://api.rawg.io/api/games/${game.id}?key=4325697e08ae47af9f63f693271a8c3a`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.background_image) {
            setBackgroundImage(data.background_image);
          } else {
            setBackgroundImage("/default-game-image.jpg");
          }
        })
        .catch(() => {
          setBackgroundImage("/default-game-image.jpg");
        });
    }
  }, [game]);

  const genres = Array.isArray(game.genres) ? game.genres.map((genre) => genre.name).join(', ') : 'No genres available';

  return (
    <article
      className={styles.navigationEffect}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      onClick={() => navigate(`/games/${game.id}/${game.name}`)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={backgroundImage} 
          alt={game.name} 
          className={styles.game_card}
          onError={(e) => e.target.src = "/default-game-image.jpg"} 
        />
      </div>
      <div className={styles.infoContainer}>
        <h4>{game.name}</h4>
        <small>{genres}</small>
        {hidden ? <small>Read more...</small> : <div>Serie di informazioni...</div>}
      </div>
    </article>
  );
}
