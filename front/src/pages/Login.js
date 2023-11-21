import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/apiConfig";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import "../static/styles/login.css";

const URL_LOGIN = "/login";
const test_url = "/city/"

const Login = ({ setUser, user }) => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Clearing err msg
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const loginData = { username: username, password: password };
    // Plain text no decryption
    try {
      // // Test
      // const response_test = await api.get(test_url);
      // console.log(response_test)
      // // Test
      const response = await api.post(URL_LOGIN, loginData);
      if (response.status === 200) {
        setUser({
          username: response.data.user.username,
          admin_rights: String(response.data.user.admin_rights),
        });
        Cookies.set("user", response.data.user.username, { expires: 30 });
        Cookies.set("admin_rights", response.data.user.admin_rights, {
          expires: 30,
        });
        setSuccess(true);
      }
    } catch (err) {
      if (err.response) {
        setErrMsg("Zła nazwa użytkownika lub hasła");
      } else if (err.request) {
        setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
      {success || user ? (
        <section className="d-flex flex-column align-items-center">
          <span className="text-center" id="logged">
            Zalogowano
          </span>
          <Link
            className="text-decoration-none text-center mt-3"
            id="link"
            to="/"
          >
            Zabierz mnie do głównej strony
          </Link>
        </section>
      ) : (
        <section>
          <div className="d-flex justify-content-center">
            <p
              ref={errRef}
              className={errMsg ? "err-msg" : "hidden"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
          <form
            className="d-flex flex-column align-items-center justify-content-center text-1vw"
            onSubmit={handleLogin}
          >
            <label className="text-center" htmlFor="username">
              Nazwa użytkownika :
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="username"
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="text-center" htmlFor="password">
              Hasło :
            </label>
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={!username || !password ? true : false}
            >
              Zaloguj
            </button>
            <Link to="/" className="text-decoration-none text-primary">
              Zabierz mnie z powrotem na główną stronę
            </Link>
          </form>
        </section>
      )}
    </div>
  );
};
export default Login;
