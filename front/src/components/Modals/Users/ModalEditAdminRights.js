import { Modal } from "react-bootstrap";
import { useState } from "react";
import ModalMessage from "../utility/ModalMessage";
import api from "../../../api/apiConfig";
import styles from "../../../static/styles/modals";

const ModalEditAdminRights = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validProps, setValidProps] = useState({
    validAdminRights: true,
  });

  const [validationError, setValidationError] = useState({
    validationErrorAdminRights: "",
  });

  const [formData, setFormData] = useState({
    admin_rights: props.admin_rights,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editRecord = async (e) => {
    const URL_PATCH = `users/admin_rights/id${props.id}`;
    e.preventDefault();
    try {
      const response = await api.patch(URL_PATCH, formData);
      if (response.status === 200) {
        setMessage(
          `Pomyślnie zmieniono uprawnienia dla użytkownika ${props.username}`
        );
        setModalMessageOpen(true);
        props.setModalPasswordOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage("Nie można zmienić uprawnień, spróbuj ponownie później");
      } else if (err.request) {
        setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalPasswordOpen(false);
    }
  };
  return (
    <section>
      <Modal
        size="lg"
        show={props.modalAminRightsOpen}
        onHide={props.setModalAdminRightsOpen}
        aria-labelledby="Ustaw uprawnienia"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Nadaj nowe uprawnienia dla {props.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <form onSubmit={editRecord}>
            <label>Uprawnienia</label>
            <div>
              <select
                className="mt-2 mb-2"
                id="admin_rights"
                name="admin_rights"
                value={formData.admin_rights}
                onChange={handleInputChange}
              >
                <option value="0">Przeglądający</option>
                <option value="1">Edytor</option>
              </select>
            </div>
            <button className="btn btn-primary mt-3 mb-2 p-3" id="submit-btn">
              Ustaw nowe uprawnienia
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
export default ModalEditAdminRights;
