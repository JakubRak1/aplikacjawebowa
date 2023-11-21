import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCreateNewEmployees from "../Modals/Employees/ModalCreateNewEmployees";
import ModalDeleteManyEmployees from "../Modals/Employees/ModalDeleteManyEmployees";

import "../../static/styles/actionBarSchool.css";

const ActionBarEmployees = ({ idToDelete, user, teams }) => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [sortNameAsc, setSortNameAsc] = useState(false);
  const [sortNameDesc, setSortNameDesc] = useState(false);
  const [sortSurnameAsc, setSortSurnameAsc] = useState(false);
  const [sortSurnameDesc, setSortSurnameDesc] = useState(false);
  const [sortTeamAsc, setSortTeamAsc] = useState(false);
  const [sortTeamDesc, setSortTeamDesc] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchSurname, setSearchSurname] = useState("");
  const [searchTeam, setSearchTeam] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
  };

  const handleModalDeleteOpen = () => {
    setModalDeleteOpen(true);
  };

  const handleSearch = (searchCat, e) => {
    let url = "";
    switch (searchCat) {
      case "name":
        url = `../employees/search?${searchCat}=${searchName}`;
        break;
      case "surname":
        url = `../employees/search?${searchCat}=${searchSurname}`;
        break;
      case "team":
        url = `../employees/search?${searchCat}=${searchTeam}`;
        break;
      default:
        break;
    }
    navigate(url, { replace: true });
    window.location.reload();
  };

  const handleFilterByCat = (filterCategory, e) => {
    let url = "";
    if (filterCategory === "name") {
      if (!sortNameAsc && !sortNameDesc) {
        setSortNameAsc(true);
        url = `../employees/sortByNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortNameAsc) {
        setSortNameAsc(false);
        setSortNameDesc(true);
        url = `../employees/sortByNameDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortNameAsc(true);
        setSortNameDesc(false);
        url = `../employees/sortByNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else if (filterCategory === "surname") {
      if (!sortSurnameAsc && !sortSurnameDesc) {
        setSortSurnameAsc(true);
        url = `../employees/sortBySurnameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortSurnameAsc) {
        setSortSurnameAsc(false);
        setSortSurnameDesc(true);
        url = `../employees/sortBySurnameDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortSurnameAsc(true);
        setSortSurnameDesc(false);
        url = `../employees/sortBySurnameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else if (filterCategory === "team") {
      if (!sortTeamAsc && !sortTeamDesc) {
        setSortTeamAsc(true);
        url = `../employees/sortByTeamAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortTeamAsc) {
        setSortTeamAsc(false);
        setSortTeamDesc(true);
        url = `../employees/sortByTeamDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortTeamAsc(true);
        setSortTeamDesc(false);
        url = `../employees/sortByTeamAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const pathnames = {
      sortByNameAsc: setSortNameAsc,
      sortByNameDesc: setSortNameDesc,
      sortBySurnameAsc: setSortSurnameAsc,
      sortBySurnameDesc: setSortSurnameDesc,
      sortByTeamAsc: setSortTeamAsc,
      sortByTeamDesc: setSortTeamDesc,
    };

    const pathname = location.pathname.substr(
      location.pathname.lastIndexOf("/") + 1
    );

    if (pathnames[pathname]) {
      pathnames[pathname](true);
    }
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column action-bar justify-content-between">
          {user.admin_rights !== "0" ? (
            <div
              className="d-flex flex-row justify-content-around mb-3"
              id="first-col"
            >
              <button onClick={handleModalCreateOpen} className="action-btn">
                <span>Dodaj Nowe</span>
              </button>
              <button onClick={handleModalDeleteOpen} className="action-btn">
                <span className="text">Usuń zaznaczone</span>
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="d-flex flex-row mb-3 justify-content-around"
            id="second-col"
          >
            <span className="d-flex flex-row border-over-span">
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleFilterByCat("name", e)}
              >
                <span className="next-to-sort-text">Imie pracownika</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortNameAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortNameDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("name", e)}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
            <span className="d-flex flex-row border-over-span">
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleFilterByCat("surname", e)}
              >
                <span className="next-to-sort-text">Nazwisko pracownika</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortSurnameAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortSurnameDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchSurname(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("surname", e)}
                  value="surname"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
          </div>
          <div
            className="d-flex flex-row justify-content-around"
            id="third-col"
          >
            <span className="d-flex flex-row border-over-span">
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleFilterByCat("team", e)}
              >
                <span className="next-to-sort-text">Zespół</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortTeamAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortTeamDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchTeam(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("team", e)}
                  value="team"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
      <ModalCreateNewEmployees
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
        teams={teams}
      />
      <ModalDeleteManyEmployees
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        idToDelete={idToDelete}
      />
    </section>
  );
};

export default ActionBarEmployees;
