import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCreateNewSchools from "../Modals/Schools/ModalCreateNewSchools";
import ModalDeleteManySchools from "../Modals/Schools/ModalDeleteManySchools";

import "../../static/styles/actionBarSchool.css";

const ActionBarSchool = ({ idToDelete, user }) => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [sortSchoolNameAsc, setSortSchoolNameAsc] = useState(false);
  const [sortSchoolNameDesc, setSortSchoolNameDesc] = useState(false);
  const [sortStreetNameAsc, setSortStreetNameAsc] = useState(false);
  const [sortStreetNameDesc, setSortStreetNameDesc] = useState(false);
  const [sortBuildingNumberAsc, setSortBuildingNumberAsc] = useState(false);
  const [sortBuildingNumberDesc, setSortBuildingNumberDesc] = useState(false);
  const [sortPhoneNumberAsc, setSortPhoneNumberAsc] = useState(false);
  const [sortPhoneNumberDesc, setSortPhoneNumberDesc] = useState(false);

  const [searchSchoolName, setSearchSchoolName] = useState("");
  const [searchStreetName, setSearchStreetName] = useState("");
  const [searchBuildingNumber, setSearchBuildingNumber] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");

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
      case "schoolName":
        url = `../schools/search?${searchCat}=${searchSchoolName}`;
        break;
      case "streetName":
        url = `../schools/search?${searchCat}=${searchStreetName}`;
        break;
      case "buildingNumber":
        url = `../schools/search?${searchCat}=${searchBuildingNumber}`;
        break;
      case "phoneNumber":
        url = `../schools/search?${searchCat}=${searchPhoneNumber}`;
        break;
      default:
        break;
    }
    navigate(url, { replace: true });
    window.location.reload();
  };

  const handleFilterByCat = (filterCategory, e) => {
    let url = "";
    if (filterCategory === "schoolName") {
      if (!sortSchoolNameAsc && !sortSchoolNameDesc) {
        setSortSchoolNameAsc(true);
        url = `../schools/sortBySchoolNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortSchoolNameAsc) {
        setSortSchoolNameAsc(false);
        setSortSchoolNameDesc(true);
        url = `../schools/sortBySchoolNameDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortSchoolNameAsc(true);
        setSortSchoolNameDesc(false);
        url = `../schools/sortBySchoolNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else if (filterCategory === "streetName") {
      if (!sortStreetNameAsc && !sortStreetNameDesc) {
        setSortStreetNameAsc(true);
        url = `../schools/sortByStreetNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortStreetNameAsc) {
        setSortStreetNameAsc(false);
        setSortStreetNameDesc(true);
        url = `../schools/sortByStreetNameDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortStreetNameAsc(true);
        setSortStreetNameDesc(false);
        url = `../schools/sortByStreetNameAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else if (filterCategory === "buildingNumber") {
      if (!sortBuildingNumberAsc && !sortBuildingNumberDesc) {
        setSortBuildingNumberAsc(true);
        url = `../schools/sortByBuildingNumberAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortBuildingNumberAsc) {
        setSortBuildingNumberAsc(false);
        setSortBuildingNumberDesc(true);
        url = `../schools/sortByBuildingNumberDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortBuildingNumberAsc(true);
        setSortBuildingNumberDesc(false);
        url = `../schools/sortByBuildingNumberAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    } else {
      if (!sortPhoneNumberAsc && !sortPhoneNumberDesc) {
        setSortPhoneNumberAsc(true);
        url = `../schools/sortByPhoneNumberAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else if (sortPhoneNumberAsc) {
        setSortPhoneNumberAsc(false);
        setSortPhoneNumberDesc(true);
        url = `../schools/sortByPhoneNumberDesc`;
        navigate(url, { replace: true });
        window.location.reload();
      } else {
        setSortPhoneNumberAsc(true);
        setSortPhoneNumberDesc(false);
        url = `../schools/sortByPhoneNumberAsc`;
        navigate(url, { replace: true });
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const pathnames = {
      sortBySchoolNameAsc: setSortSchoolNameAsc,
      sortBySchoolNameDesc: setSortSchoolNameDesc,
      sortByStreetNameAsc: setSortStreetNameAsc,
      sortByStreetNameDesc: setSortStreetNameDesc,
      sortByBuildingNumberAsc: setSortBuildingNumberAsc,
      sortByBuildingNumberDesc: setSortBuildingNumberDesc,
      sortByPhoneNumberAsc: setSortPhoneNumberAsc,
      sortByPhoneNumberDesc: setSortPhoneNumberDesc,
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
                onClick={(e) => handleFilterByCat("schoolName", e)}
              >
                <span className="next-to-sort-text">Nazwa placówki</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortSchoolNameAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortSchoolNameDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchSchoolName(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("schoolName", e)}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
            <span className="d-flex flex-row border-over-span">
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleFilterByCat("streetName", e)}
              >
                <span className="next-to-sort-text">Nazwa Ulicy</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortStreetNameAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortStreetNameDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchStreetName(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("streetName", e)}
                  value="streetName"
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
                onClick={(e) => handleFilterByCat("buildingNumber", e)}
              >
                <span className="next-to-sort-text">Numer budynku</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortBuildingNumberAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortBuildingNumberDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="number"
                  min="0"
                  onChange={(e) => {
                    setSearchBuildingNumber(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("buildingNumber", e)}
                  value="buildingNumber"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
            <span className="d-flex flex-row border-over-span">
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleFilterByCat("phoneNumber", e)}
              >
                <span className="next-to-sort-text">Numer Telefonu</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortPhoneNumberAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortPhoneNumberDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row border-over-span">
                <input
                  type="number"
                  min="111111111"
                  onChange={(e) => {
                    setSearchPhoneNumber(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("phoneNumber", e)}
                  value="phoneNumber"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
      <ModalCreateNewSchools
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
      />
      <ModalDeleteManySchools
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        idToDelete={idToDelete}
      />
    </section>
  );
};

export default ActionBarSchool;
