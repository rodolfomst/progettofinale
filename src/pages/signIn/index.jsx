import Header from "../../components/header";
import { useNavigate } from "react-router";
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';
import './sigin.css'; 

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      formRegister.reset();
      toast.error('Bad Login');
    } else {
      formRegister.reset();
      toast.success('Login correct');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className="signInContainer">
      <Header />
      <main className="signInFormWrapper">
        <h1>Login</h1>
        <form className="signInForm" onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="Email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
          />
          <button type="submit" className="submitButton">Login now</button>
        </form>
        <Toaster position="bottom-center" />
      </main>
    </div>
  );
}
