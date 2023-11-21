import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../../api/apiConfig";
import ModalMessage from "../utility/ModalMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../static/styles/modals";

const URL_POST = "/schools/create-new";

const ModalCreateNewSchools = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validSchoolNameEdit: "",
    validStreetNameEdit: "",
    validBuildingNumberEdit: "",
    validPhoneNumberEdit: "",
  });

  const [validationError, setValidationError] = useState({
    validationErrorSchoolName: "",
    validationErrorStreetName: "",
    validationErrorBuildingNumber: "",
    validationErrorPhoneNumber: "",
  });

  const [formData, setFormData] = useState({
    schoolName: "",
    streetName: "",
    buildingNumber: "",
    phoneNumber: "",
    additionalInformation: "",
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
      schoolName: savedData.school_name || "",
      streetName: savedData.street_name || "",
      buildingNumber: savedData.building_number || "",
      phoneNumber: savedData.phone_number || "",
      additionalInformation: savedData.additional_information || "",
    });
  }, []);

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
        show={props.modalCreateOpen}
        onHide={() => props.setModalCreateOpen(false)}
        aria-labelledby="Dodaj nowy rekord danej kategori"
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
              id="schoolName"
              name="schoolName"
              required
              onChange={handleInputChange}
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
              id="streetName"
              name="streetName"
              required
              onChange={handleInputChange}
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
              id="buildingNumber"
              name="buildingNumber"
              required
              onChange={handleInputChange}
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
              id="phoneNumber"
              name="phoneNumber"
              required
              onChange={handleInputChange}
              value={formData.phoneNumber}
              aria-invalid={validProps.validPhoneNumberEdit ? "false" : "true"}
            />
            <label>Dodatkowe informacje</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="additionalInformation"
              name="additionalInformation"
              onChange={handleInputChange}
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
export default ModalCreateNewSchools;
