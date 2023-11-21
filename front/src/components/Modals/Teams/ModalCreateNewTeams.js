import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../../api/apiConfig";
import ModalMessage from "../utility/ModalMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../static/styles/modals";

const URL_POST = "/teams/create-new";

const ModalCreateNewTeams = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validNameEdit: "",
  });

  const [validationError, setValidationError] = useState({
    validationErrorName: "",
  });

  const [formData, setFormData] = useState({
    teamName: "",
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
      teamName: savedData.teamName || "",
    });
  }, []);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorName", "");
    if (formData.teamName.length < 2 || formData.teamName.length > 100) {
      result = false;
      handleValidationError(
        "validationErrorName",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9\s\-']+$/.test(formData.teamName)) {
      result = false;
      handleValidationError(
        "validationErrorName",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validNameEdit", result);
  }, [formData.teamName]);

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalCreateOpen}
        onHide={() => props.setModalCreateOpen(false)}
        aria-labelledby="Dodaj nowy rekord Zespoły"
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
                validProps.validNameEdit || !formData.teamName
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorName}
            </div>
            <label>
              Nazwa zespołu
              <span className={validProps.validNameEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validNameEdit || !formData.teamName
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
              id="teamName"
              name="teamName"
              required
              onChange={handleInputChange}
              value={formData.teamName}
              aria-invalid={validProps.validNameEdit ? "false" : "true"}
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={!validProps.validNameEdit ? true : false}
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
export default ModalCreateNewTeams;
