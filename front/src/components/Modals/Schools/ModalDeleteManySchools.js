import { Modal } from "react-bootstrap";
import { useState } from "react";
import api from "../../../api/apiConfig";
import ModalMessage from "../utility/ModalMessage";
import styles from "../../../static/styles/modals";

const URL_DELETE_MANY = "/schools";

const ModalDeleteManySchools = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeleteRecords = async (e) => {
    e.preventDefault();
    if (props.idToDelete.length === 0) {
      setMessage("Niezaznaczono żadnego rekordu");
      setModalMessageOpen(true);
      props.setModalDeleteOpen(false);
    } else {
      try {
        const response = await api.delete(URL_DELETE_MANY, {
          data: {
            id: props.idToDelete,
          },
        });
        if (response.status === 200) {
          setMessage("Pomyślnie usunięto żądane rekordy");
          setModalMessageOpen(true);
          props.setModalDeleteOpen(false);
        }
      } catch (err) {
        if (err.response) {
          setMessage("Nie można usunąć rekordów spróbuj ponownie później");
        } else if (err.request) {
          setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
        }
        setModalMessageOpen(true);
        props.setModalDeleteOpen(false);
      }
    }
  };

  return (
    <section>
      <Modal
        size="lg"
        show={props.modalDeleteOpen}
        onHide={() => props.setModalDeleteOpen(false)}
        aria-labelledby="Usuń zaznaczone z bazy danych"
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.title}>
            Usuń rekordy z bazy danych
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.body}>
          <form onSubmit={handleDeleteRecords}>
            <span>Czy na pewno chcesz usunąć zaznaczone rekory</span>
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
export default ModalDeleteManySchools;
