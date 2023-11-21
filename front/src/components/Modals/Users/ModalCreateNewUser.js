import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../../api/apiConfig";
import ModalMessage from "../utility/ModalMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../static/styles/modals";

const URL_POST = "/users/create-new";

const ModalCreateNewUsers = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validUsername: "",
    validPassword: "",
    validRetypedPassword: "",
  });

  const [validationError, setValidationError] = useState({
    validationErrorUsername: "",
    validationErrorPassword: "",
    validationErrorRetypedPassword: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    admin_right: "",
    password: "",
    retypedPassword: "",
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
      const response = await api.post(URL_POST, {
        username: formData.username,
        admin_rights: formData.admin_right,
        password: formData.password,
      });
      if (response.status === 200) {
        setMessage("Pomyślnie dodano nowego użytkownika");
        setModalMessageOpen(true);
        props.setModalCreateOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage(
          `Brak możliwości dodania nowego użytkownika, sprawdź czy taki juz nie istnieje i spróbuj ponownie ${err}`
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
      username: savedData.username || "",
      admin_right: savedData.admin_right || "",
      password: savedData.password || "",
    });
  }, []);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorUsername", "");
    if (formData.username.length < 3 || formData.username.length > 20) {
      result = false;
      handleValidationError(
        "validationErrorUsername",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(formData.username)) {
      result = false;
      handleValidationError(
        "validationErrorUsername",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validUsername", result);
  }, [formData.username]);

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
        show={props.modalCreateOpen}
        onHide={() => props.setModalCreateOpen(false)}
        aria-labelledby="Dodaj nowego użytkownika"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Dodaj nowego użytkownika
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePostNewRecord} style={styles.body}>
            <div
              className={
                validProps.validUsername || !formData.username
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorUsername}
            </div>
            <label>
              Nazwa użytkownika
              <span className={validProps.validUsername ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validUsername || !formData.username
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
              id="username"
              name="username"
              required
              onChange={handleInputChange}
              value={formData.username}
              aria-invalid={validProps.validUsername ? "false" : "true"}
            />

            <label>Uprawnienia użytkownika</label>
            <div>
              <select
                className="mt-2 mb-2"
                id="admin_right"
                name="admin_right"
                value={formData.admin_right}
                onChange={handleInputChange}
              >
                <option value="">Wybierz uprawnienia</option>
                <option value="0">Przeglądający</option>
                <option value="1">Edytor</option>
              </select>
            </div>

            <div
              className={
                validProps.validPassword || !formData.password
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorPassword}
            </div>
            <label>
              Hasło
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
              id="password"
              name="password"
              required
              onChange={handleInputChange}
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
                !validProps.validUsername ||
                !formData.admin_right ||
                !validProps.validPassword ||
                !validProps.validRetypedPassword
                  ? true
                  : false
              }
            >
              Dodaj nowego użytkownika
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
export default ModalCreateNewUsers;
