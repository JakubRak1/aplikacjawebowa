import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCreateNewTeams from "../Modals/Teams/ModalCreateNewTeams";

import "../../static/styles/actionBarSchool.css";

const ActionBarTeams = ({ user }) => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const [sortNameAsc, setSortNameAsc] = useState(false);
  const [sortNameDesc, setSortNameDesc] = useState(false);
  const [sortEmployeesAsc, setSortEmployeesAsc] = useState(false);
  const [sortEmployeesDesc, setSortEmployeesDesc] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchEmployees, setSearchEmployees] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
  };

  const handleSearch = (searchCat, e) => {
    let url = "";
    switch (searchCat) {
      case "name":
        url = `../teams/search?${searchCat}=${searchName}`;
        break;
      case "employees":
        console.log(searchEmployees);
        url = `../teams/search?${searchCat}=${searchEmployees}`;
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
        url = `../teams/sortByNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortNameAsc) {
        setSortNameAsc(false);
        setSortNameDesc(true);
        url = `../teams/sortByNameDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortNameAsc(true);
        setSortNameDesc(false);
        url = `../teams/sortByNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else if (filterCategory === "employees") {
      if (!sortEmployeesAsc && !sortEmployeesDesc) {
        setSortEmployeesAsc(true);
        url = `../teams/sortByEmployeesAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortEmployeesAsc) {
        setSortEmployeesAsc(false);
        setSortEmployeesDesc(true);
        url = `../teams/sortByEmployeesDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortEmployeesAsc(true);
        setSortEmployeesDesc(false);
        url = `../teams/sortByEmployeesAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const pathnames = {
      sortByNameAsc: setSortNameAsc,
      sortByNameDesc: setSortNameDesc,
      sortByEmployeesAsc: setSortEmployeesAsc,
      sortByEmployeesDesc: setSortEmployeesDesc,
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
                <span className="next-to-sort-text">Nazwa Zespołu</span>
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
                onClick={(e) => handleFilterByCat("employees", e)}
              >
                <span className="next-to-sort-text">Liczba pracowników</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortEmployeesAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortEmployeesDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchEmployees(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("employees", e)}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
      <ModalCreateNewTeams
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
      />
    </section>
  );
};

export default ActionBarTeams;
