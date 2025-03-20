import Header from "../../components/header";
import { Link, useNavigate } from "react-router";
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';
import './SignUp.css'; 

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, first_name, last_name, username } = Object.fromEntries(new FormData(formRegister));
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username
        }
      }
    });

    if (error) {
      formRegister.reset();
      toast.error(error.message || 'An error occurred during sign up');
    } else {
      formRegister.reset();
      toast.success('Signed Up successfully');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className="signUpContainer">
      <Header />
      <main className="signUpFormWrapper">
        <h1>Create an Account</h1>
        <form className="signUpForm" onSubmit={handleSignUp}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            aria-label="First Name"
            autoComplete="given-name"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            aria-label="Last Name"
            autoComplete="family-name"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
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
          <fieldset>
            <label htmlFor="remember">
              <input
                type="checkbox"
                role="switch"
                id="remember"
                name="remember"
              />
              Remember me
            </label>
          </fieldset>
          <button type="submit" className="submitButton">Register now</button>
          <p className="loginRedirect">
            Already registered? 
            <Link to="/login" className="loginLink">
              Login
            </Link>
          </p>
        </form>
        <Toaster position="bottom-center" />
      </main>
    </div>
  );
}
