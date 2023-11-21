import { Modal } from "react-bootstrap";
import ModalMessage from "./ModalMessage";
import { useState } from "react";
import api from "../../../api/apiConfig";
import styles from "../../../static/styles/modals";

const ModalDeleteOneRecord = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const deleteRecord = async (e) => {
    const URL_DELETE = `${props.type}/id${props.id}`;
    console.log(URL_DELETE);
    e.preventDefault();
    try {
      const response = await api.delete(URL_DELETE);
      if (response.status === 200) {
        setMessage("Pomyślnie usunięto rekord");
        setModalMessageOpen(true);
        props.setModalDeleteOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage("Nie można zedytować rekordu spróbuj ponownie później");
      } else if (err.request) {
        setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalDeleteOpen(false);
    }
  };

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalDeleteOpen}
        onHide={props.setModalDeleteOpen}
        aria-labelledby="Usuń z bazy danych"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>Usuń</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <form onSubmit={deleteRecord}>
            <span>Czy na pewno chcesz usunąć rekord?</span>
            <br />
            <button className="btn btn-primary mt-3 mb-2 p-3" id="submit-btn">
              Usuń
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
export default ModalDeleteOneRecord;
