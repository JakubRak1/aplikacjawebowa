import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./../static/styles/cookies.css";

const CookiesMessage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const handleAccept = () => {
    Cookies.set("show_cookies_msg", false);
    setShowBanner(false);
  };
  useEffect(() => {
    const cookiesBanner = Cookies.get("show_cookies_msg");
    if (cookiesBanner) {
      setShowBanner(false);
    }
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="cookie-banner border rounded d-flex flex-column">
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="close rounded"
          aria-label="Close"
          onClick={handleAccept}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-cookie">
          We use cookies to improve your experience on our site.
        </p>
      </div>
      <div className="d-flex justify-content-center mb-1">
        <button className="btn-accept rounded" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiesMessage;
