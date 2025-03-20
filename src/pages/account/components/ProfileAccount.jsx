import { useState, useEffect, useContext } from "react";
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/SessionContext";
import Avatar from "./Avatar";
import './ProfileAccount.css';

export default function ProfileAccount() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <div className="profile-container">
      <form onSubmit={updateProfile} className="form-widget">
        <div className="avatar-container">
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(event, url) => {
              updateProfile(event, url);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="username">nome utente</label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="first_name">nome</label>
          <input
            id="first_name"
            type="text"
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="last_name">cognome</label>
          <input
            id="last_name"
            type="text"
            value={last_name || ""}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="action-buttons">
          <button
            className="button primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update Profile"}
          </button>
        </div>
        <div className="action-buttons">
          <button
            className="button secondary"
            type="button"
            onClick={() => supabase.auth.signOut()}
          >
            esci dal profilo
          </button>
        </div>
      </form>
    </div>
  );
}
