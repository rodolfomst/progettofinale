import { useContext, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import supabase from "../../../supabase/client";
import { formatDate } from "../../../utils/formatDate";
import SessionContext from "../../../context/SessionContext";
import './ProfileAccount.css';

export default function Reviews() {
  const { session } = useContext(SessionContext);
  const [reviews, setReviews] = useState([]);

  const readFav = async () => {
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("profile_id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      setReviews(reviews);
    }
  };

  useEffect(() => {
    if (session) {
      readFav();
    }
  }, [session]);

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {reviews.length === 0 && <p style={{ color: 'white' }}>Non ci sono recensioni al momento.</p>}
      {reviews &&
        reviews.map((review) => (
          <>
            <ListItem alignItems="flex-start" key={review.id}>
              <ListItemText
                primary={
                  <div>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{
                        color: "white",  
                      }}
                    >
                      {review.game_name}
                    </Typography>
                  </div>
                }
                secondary={
                  <div>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{
                        color: "white", 
                      }}
                    >
                      {review.review_title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{
                        color: "white", 
                      }}
                    >
                      {review.review_content}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{
                        color: "gray", 
                      }}
                    >
                      Aggiunta il: {formatDate(review.created_at)}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider sx={{ backgroundColor: "white" }} />
          </>
        ))}
    </List>
  );
}
