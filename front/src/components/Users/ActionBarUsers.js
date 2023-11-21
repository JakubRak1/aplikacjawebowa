import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ModalCreateNewUsers from "../Modals/Users/ModalCreateNewUser";

import "../../static/styles/actionBarSchool.css";

const ActionBarUsers = () => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const [searchUsername, setSearchUsername] = useState("");

  const navigate = useNavigate();

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
  };

  const handleSearch = (e) => {
    let url = `../users/search?username=${searchUsername}`;
    navigate(url, { replace: true });
    window.location.reload();
  };

  return (
    <section>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column action-bar justify-content-between">
          <div
            className="d-flex flex-row justify-content-around mb-3"
            id="first-col"
          >
            <button onClick={handleModalCreateOpen} className="action-btn">
              <span>Dodaj Nowe</span>
            </button>
            <div className="text d-flex flex-row border-over-span">
              <span className="text-no-button">Nazwa Zespołu</span>
              <input
                type="text"
                onChange={(e) => {
                  setSearchUsername(e.target.value);
                }}
              />
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleSearch(e)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateNewUsers
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
      />
    </section>
  );
};

export default ActionBarUsers;
