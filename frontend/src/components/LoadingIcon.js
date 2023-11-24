import "../static/styles/loadingIcon.css";
const LoadingIcon = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default LoadingIcon;
