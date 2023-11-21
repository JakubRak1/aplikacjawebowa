import { Link } from "react-router-dom";
import "../static/styles/404.css";

const Error = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <span className="text-center mt-5 display-1 heading"> 404 </span>
      <span className="text-center mb-3 description">
        Strona nie została znaleziona
      </span>
      <button className="btn btn-primary">
        <Link to="/" className="text-decoration-none text-white">
          Zabierz mnie do głównej strony
        </Link>
      </button>
    </div>
  );
};
export default Error;
