
import RealtimeChat from "./RealtimeChat";
import { toast } from "sonner";
import supabase from "../../../supabase/client";
import "./Chat.css";

export default function Chat({ game, session }) {
  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        toast.error("invio sbagliato 😩");
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  }

  return (
    <>
      <div className="chat_game_container">
        <RealtimeChat game={game} />
      </div>
      <div className="message_form_wrapper">
        <form onSubmit={handleMessageSubmit}>
          <fieldset role="group">
            <input type="text" name="message" placeholder="Scrivi un messaggio..." />
            <input type="submit" value="Invia" />
          </fieldset>
        </form>
      </div>
    </>
  );
}