import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../../api/apiConfig";
import ModalMessage from "../utility/ModalMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../static/styles/modals";

const URL_POST = "/employees/create-new";

const ModalCreateNewEmployees = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validNameEdit: "",
    validSurnameEdit: "",
    validTeamEdit: "",
  });

  const [validationError, setValidationError] = useState({
    validationErrorName: "",
    validationErrorSurname: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    team: "",
  });

  const saveDataToCookies = () => {
    Object.keys(formData).forEach((key) => {
      Cookies.set(key, formData[key], { expires: null });
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    saveDataToCookies();
  };

  const handleValidProps = (nameOfProps, value) => {
    setValidProps({
      ...validProps,
      [nameOfProps]: value,
    });
  };

  const handleValidationError = (nameOfErrorProps, value) => {
    setValidationError({
      ...validationError,
      [nameOfErrorProps]: value,
    });
  };

  const handlePostNewRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(URL_POST, formData);
      if (response.status === 200) {
        setMessage("Pomyślnie dodano nowy rekord");
        setModalMessageOpen(true);
        props.setModalCreateOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage(
          `Brak możliwości dodania nowego rekoru, sprawdź czy taki juz nie istnieje i spróbuj ponownie ${err}`
        );
      } else if (err.request) {
        setMessage("Bład połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalCreateOpen(false);
    }
  };

  useEffect(() => {
    const savedData = Cookies.get();
    setFormData({
      name: savedData.name || "",
      surname: savedData.surname || "",
      team: savedData.team || "",
    });
  }, []);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorName", "");
    if (formData.name.length < 2 || formData.name.length > 100) {
      result = false;
      handleValidationError(
        "validationErrorName",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9\s\-']+$/.test(formData.name)) {
      result = false;
      handleValidationError(
        "validationErrorName",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validNameEdit", result);
  }, [formData.name]);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorSurname", "");
    if (formData.surname.length < 2 || formData.surname.length > 200) {
      result = false;
      handleValidationError(
        "validationErrorSurnem",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9\s\.'-]+$/.test(formData.surname)) {
      result = false;
      handleValidationError(
        "validationErrorSurname",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validSurnameEdit", result);
  }, [formData.surname]);

  useEffect(() => {
    let result = true;
    if (formData.team === "") {
      result = false;
    }
    handleValidProps("validTeamEdit", result);
  }, [formData.team]);

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalCreateOpen}
        onHide={() => props.setModalCreateOpen(false)}
        aria-labelledby="Dodaj nowy rekord Pracownicy"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Dodaj nowy rekord do bazy danych
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePostNewRecord} style={styles.body}>
            <div
              className={
                validProps.validNameEdit || !formData.name
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorName}
            </div>
            <label>
              Imie pracownika
              <span className={validProps.validNameEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validNameEdit || !formData.name
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="name"
              name="name"
              required
              onChange={handleInputChange}
              value={formData.name}
              aria-invalid={validProps.validNameEdit ? "false" : "true"}
            />
            <div
              className={
                validProps.validSurnameEdit || !formData.surname
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorSurname}
            </div>
            <label>
              Nazwisko pracownika
              <span
                className={validProps.validSurnameEdit ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validSurnameEdit || !formData.surname
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="surname"
              name="surname"
              required
              onChange={handleInputChange}
              value={formData.surname}
              aria-invalid={validProps.validSurnameEdit ? "false" : "true"}
            />
            <label>Zespół</label>
            <select
              className="mt-2 mb-2"
              id="team"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
            >
              <option value="">Wybierz zespół</option>
              {props.teams.map((team) => (
                <option value={team}>{team}</option>
              ))}
            </select>
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={
                !validProps.validNameEdit ||
                !validProps.validSurnameEdit ||
                !validProps.validTeamEdit
                  ? true
                  : false
              }
            >
              Dodaj
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <ModalMessage
        modalMessageOpen={modalMessageOpen}
        message={message}
        setModalMessageOpen={setModalMessageOpen}
      />
    </section>
  );
};
export default ModalCreateNewEmployees;
