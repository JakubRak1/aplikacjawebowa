import "../static/styles/conctionError.css";

const ConnectionError = ({ errorMsg }) => {
  return (
    <h1 className="text-center mt-5" id="error">
      {errorMsg}
    </h1>
  );
};

export default ConnectionError;
