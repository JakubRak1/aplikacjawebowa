import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalMessage from "../utility/ModalMessage";
import api from "../../../api/apiConfig";
import styles from "../../../static/styles/modals";

const ModalEditPassword = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validPassword: true,
    validRetypedPassword: false,
  });

  const [validationError, setValidationError] = useState({
    validationErrorPassword: "",
    validationErrorRetypedPassword: "",
  });

  const [formData, setFormData] = useState({
    password: "",
    retypedPassword: "",
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
    const URL_PATCH = `users/password/id${props.id}`;
    e.preventDefault();
    try {
      const response = await api.patch(URL_PATCH, {
        password: formData.password,
      });
      if (response.status === 200) {
        setMessage(
          `Pomyślnie zmieniono hasło dla użytkownika ${props.username}`
        );
        setModalMessageOpen(true);
        props.setModalPasswordOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage("Nie można ustawić nowego hasła, spróbuj ponownie później");
      } else if (err.request) {
        setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalPasswordOpen(false);
    }
  };

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorPassword", "");
    if (formData.password.length < 8 || formData.password.length > 24) {
      result = false;
      handleValidationError(
        "validationErrorPassword",
        "Hasło nie zawiera się w przedziale 8-24 znaków"
      );
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      result = false;
      handleValidationError(
        "validationErrorPassword",
        "Hasło powinno zawierac co najmniej jedną dużą litere, mała litere, numer oraz znak specjalny"
      );
    }
    handleValidProps("validPassword", result);
  }, [formData.password]);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorRetypedPassword", "");
    if (formData.retypedPassword !== formData.password) {
      result = false;
      handleValidationError(
        "validationErrorRetypedPassword",
        "Hasła nie są takie same"
      );
    }
    handleValidProps("validRetypedPassword", result);
  }, [formData.retypedPassword]);

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalPasswordOpen}
        onHide={props.setModalPasswordOpen}
        aria-labelledby="Nowe hasło"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Nadaj nowe hasło {props.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <div
            className={
              validProps.validPassword || !formData.password
                ? "hidden"
                : "invalid"
            }
          >
            {validationError.validationErrorPassword}
          </div>
          <form onSubmit={editRecord}>
            <label>
              Nowe hasło
              <span className={validProps.validPassword ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validPassword || !formData.password
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="password"
              required
              onChange={handleInputChange}
              name="password"
              value={formData.password}
              aria-invalid={validProps.validPassword ? "false" : "true"}
            />
            <div
              className={
                validProps.validRetypedPassword || !formData.retypedPassword
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorRetypedPassword}
            </div>
            <label>
              Powtórz nowe hasło
              <span
                className={validProps.validRetypedPassword ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validRetypedPassword || !formData.retypedPassword
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="password"
              required
              onChange={handleInputChange}
              name="retypedPassword"
              value={formData.retypedPassword}
              aria-invalid={validProps.validRetypedPassword ? "false" : "true"}
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={
                !validProps.validPassword || !validProps.validRetypedPassword
                  ? true
                  : false
              }
            >
              Ustaw nowe hasło
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
export default ModalEditPassword;
