import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../static/styles/mainNavbar.css";

const PAGES = [
  { path: "/home", title: "Strona startowa" },
  { path: "/login", title: "Logowanie" },
  { path: "/routes", title: "Trasy" },
  { path: "/schools", title: "Szkoły" },
  { path: "/concerts", title: "Koncerty" },
  { path: "/teams", title: "Zespoły" },
  { path: "/employees", title: "Pracownicy" },
  { path: "/maps", title: "Mapy" },
  { path: "/users", title: "Użytkownicy" },
];

const PAGES_URL_USER = [
  { path: "/routes", title: "Trasy" },
  { path: "/schools", title: "Szkoły" },
  { path: "/concerts", title: "Koncerty" },
  { path: "/teams", title: "Zespoły" },
  { path: "/employees", title: "Pracownicy" },
  { path: "/maps", title: "Mapy" },
];
const PAGES_URL_ADMIN = [
  { path: "/routes", title: "Trasy" },
  { path: "/schools", title: "Szkoły" },
  { path: "/concerts", title: "Koncerty" },
  { path: "/teams", title: "Zespoły" },
  { path: "/employees", title: "Pracownicy" },
  { path: "/maps", title: "Mapy" },
  { path: "/users", title: "Użytkownicy" },
];

const getNavigationTitle = (pathname) => {
  if (pathname === "/") {
    return "Strona startowa";
  } else {
    const page = PAGES.find((page) => pathname.includes(page.path));
    return page ? page.title : "Błąd";
  }
};

const MainNavbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationTitle = getNavigationTitle(location.pathname);
  const admin_rights = Cookies.get("admin_rights");

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove("user");
    Cookies.remove("admin_rights");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between main-nav">
      <Link to="/">
        <img
          className="logo"
          src={require("./../static/images/logo.png")}
          alt="logo"
        />
      </Link>
      <div className="sub-main-nav d-flex flex-column align-items-center">
        <div>{navigationTitle}</div>
        {user && (admin_rights === "0" || admin_rights === "1") && (
          <div className="d-flex flex-row justify-content-between">
            {PAGES_URL_USER.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="text-decoration-none d-flex align-items-center"
              >
                <button
                  className={
                    location.pathname.includes(page.path)
                      ? "button-nav-active"
                      : "button-nav"
                  }
                >
                  <span className="text">{page.title}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
        {user && admin_rights === "2" && (
          <div className="d-flex flex-row justify-content-between">
            {PAGES_URL_ADMIN.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="text-decoration-none d-flex align-items-center"
              >
                <button
                  className={
                    location.pathname.includes(page.path)
                      ? "button-nav-active"
                      : "button-nav"
                  }
                >
                  <span className="text">{page.title}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
      {user ? (
        <>
          <div className="d-flex align-items-center">
            <div className="username-box">{user.username}</div>
          </div>
          <div className="d-flex align-items-center">
            <button className="button-log-out" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>
        </>
      ) : (
        <Link to="/login" className="d-flex align-items-center">
          <button className="button-log-in">LOG IN</button>
        </Link>
      )}
    </div>
  );
};
export default MainNavbar;
