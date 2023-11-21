import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalMessage from "../utility/ModalMessage";
import api from "../../../api/apiConfig";
import styles from "../../../static/styles/modals";

const ModalEditSchool = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validSchoolNameEdit: true,
    validStreetNameEdit: true,
    validBuildingNumberEdit: true,
    validPhoneNumberEdit: true,
  });

  const [validationError, setValidationError] = useState({
    validationErrorSchoolName: "",
    validationErrorStreetName: "",
    validationErrorBuildingNumber: "",
    validationErrorPhoneNumber: "",
  });

  const [formData, setFormData] = useState({
    schoolName: props.schoolName,
    streetName: props.streetName,
    buildingNumber: props.buildingNumber,
    phoneNumber: props.phoneNumber,
    additionalInformation: props.additionalInformation,
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
    const URL_PATCH = `schools/id${props.id}`;
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
    handleValidationError("validationErrorSchoolName", "");
    if (formData.schoolName.length < 2 || formData.schoolName.length > 100) {
      result = false;
      handleValidationError(
        "validationErrorSchoolName",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9\s\-']+$/.test(formData.schoolName)) {
      result = false;
      handleValidationError(
        "validationErrorSchoolName",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validSchoolNameEdit", result);
  }, [formData.schoolName]);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorStreetName", "");
    if (formData.streetName.length < 2 || formData.streetName.length > 50) {
      result = false;
      handleValidationError(
        "validationErrorStreetName",
        "Nazwa jest za krótka lub za długa"
      );
    } else if (!/^[a-zA-Z0-9\s\.'-]+$/.test(formData.streetName)) {
      result = false;
      handleValidationError(
        "validationErrorStreetName",
        "Nazwa posiada niedozwole symbole"
      );
    }
    handleValidProps("validStreetNameEdit", result);
  }, [formData.streetName]);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorBuildingNumber", "");
    if (
      formData.buildingNumber.length < 1 ||
      formData.buildingNumber.length > 10
    ) {
      result = false;
      handleValidationError(
        "validationErrorBuildingNumber",
        "Numer budynku musi zawierać się od 1 znaku do 10"
      );
    }
    handleValidProps("validBuildingNumberEdit", result);
  }, [formData.buildingNumber]);

  useEffect(() => {
    let result = true;
    handleValidationError("validationErrorPhoneNumber", "");
    if (formData.phoneNumber < 111111111 || formData.phoneNumber > 999999999) {
      result = false;
      handleValidationError(
        "validationErrorPhoneNumber",
        "Format numeru telefonu musi być bez numeru kierunkowego"
      );
    }
    handleValidProps("validPhoneNumberEdit", result);
  }, [formData.phoneNumber]);

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
            Edytuj {props.schoolName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <form onSubmit={editRecord}>
            <div
              className={
                validProps.validSchoolNameEdit || !formData.schoolName
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorSchoolName}
            </div>
            <label>
              Nazwa placówki
              <span
                className={validProps.validSchoolNameEdit ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validSchoolNameEdit || !formData.schoolName
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
              name="schoolName"
              value={formData.schoolName}
              aria-invalid={validProps.validSchoolNameEdit ? "false" : "true"}
            />
            <div
              className={
                validProps.validStreetNameEdit || !formData.streetName
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorStreetName}
            </div>
            <label>
              Nazwa ulicy
              <span
                className={validProps.validStreetNameEdit ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validStreetNameEdit || !formData.streetName
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
              name="streetName"
              value={formData.streetName}
              aria-invalid={validProps.validStreetNameEdit ? "false" : "true"}
            />
            <div
              className={
                validProps.validBuildingNumberEdit || !formData.buildingNumber
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorBuildingNumber}
            </div>
            <label>
              Numer budynku
              <span
                className={
                  validProps.validBuildingNumberEdit ? "valid" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validBuildingNumberEdit || !formData.buildingNumber
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              required
              onChange={handleInputChange}
              name="buildingNumber"
              value={formData.buildingNumber}
              aria-invalid={
                validProps.validBuildingNumberEdit ? "false" : "true"
              }
            />
            <div
              className={
                validProps.validPhoneNumberEdit || !formData.phoneNumber
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationError.validationErrorPhoneNumber}
            </div>
            <label>
              Numer telefonu
              <span
                className={validProps.validPhoneNumberEdit ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validProps.validPhoneNumberEdit || !formData.phoneNumber
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              required
              onChange={handleInputChange}
              name="phoneNumber"
              value={formData.phoneNumber}
              aria-invalid={validProps.validPhoneNumberEdit ? "false" : "true"}
            />
            <label>Dodatkowe informacje</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              onChange={handleInputChange}
              name="additionalInformation"
              value={formData.additionalInformation}
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={
                !validProps.validSchoolNameEdit ||
                !validProps.validStreetNameEdit ||
                !validProps.validBuildingNumberEdit ||
                !validProps.validSchoolNameEdit
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
export default ModalEditSchool;
