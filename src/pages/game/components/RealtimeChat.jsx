
import { useEffect, useState, useRef } from "react";
import style from "../game.module.css";
import supabase from "../../../supabase/client";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function RealtimeChat({ game }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  function scrollSmoothToBottom() {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  const getInitialMessages = async () => {
    setLoadingInitial(true);
 
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", game.id);
    if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(false);
    setMessages(messages);
  };

  useEffect(() => {
    if (game) {
      getInitialMessages();
    }
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      channel.unsubscribe();
    };
  }, [game]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  return (
    <div className={style.messages} ref={messageRef}>
      {loadingInitial && <progress></progress>}
      {error && <article>{error}</article>}
      {messages &&
        messages.map((message) => (
          <article key={message.id} className={style.chat_message}>
            <p className={style.chat_username}>{message.profile_username}</p>
            <small className={style.message}>{message.content}</small>
            <p className={style.timestamps}>{dayjs().to(dayjs(message.created_at))}</p>
          </article>
        ))}
    </div>
  );
}