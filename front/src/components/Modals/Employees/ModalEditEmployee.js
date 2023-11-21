import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalMessage from "../utility/ModalMessage";
import api from "../../../api/apiConfig";
import styles from "../../../static/styles/modals";

const ModalEditEmployee = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validNameEdit: true,
    validSurnameEdit: true,
  });

  const [validationError, setValidationError] = useState({
    validationErrorName: "",
    validationErrorSurname: "",
  });

  const [formData, setFormData] = useState({
    name: props.name,
    surname: props.surname,
    team: props.team,
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const editRecord = async (e) => {
    const URL_PATCH = `employees/id${props.id}`;
    e.preventDefault();
    try {
      const response = await api.patch(URL_PATCH, formData);
      if (response.status === 200) {
        setMessage("Pomyślnie zedytowano rekord");
        setModalMessageOpen(true);
        props.setModalEditOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage("Nie można zedytować rekordu spróbuj ponownie później");
      } else if (err.request) {
        setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalEditOpen(false);
    }
  };

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

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalEditOpen}
        onHide={props.setModalEditOpen}
        aria-labelledby="Edytuj rekord"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Edytuj {props.name} {props.surname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <form onSubmit={editRecord}>
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
              Imię pracownika
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
              required
              onChange={handleInputChange}
              name="name"
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
              required
              onChange={handleInputChange}
              name="surname"
              value={formData.surname}
              aria-invalid={validProps.validSurnameEdit ? "false" : "true"}
            />
            <label>Zespół</label>
            <div>
              <select
                className="mt-2 mb-2"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
              >
                {props.teams.map((team) => (
                  <option value={team}>{team}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={
                !validProps.validNameEdit || !validProps.validSurnameEdit
                  ? true
                  : false
              }
            >
              Edytuj
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
export default ModalEditEmployee;
