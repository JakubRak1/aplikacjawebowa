import { Modal } from "react-bootstrap";

const ModalMessage = (props) => {
  return (
    <Modal
      size="lg"
      show={props.modalMessageOpen}
      onHide={() => {
        props.setModalMessageOpen(false);
      }}
      aria-labelledby="Wiadomość od serwera"
    >
      <Modal.Header closeButton />
      <Modal.Body
        style={{
          fontSize: "1vw",
          textAlign: "center",
          paddingBottom: "3vw",
          marginTop: "2vw",
        }}
      >
        <span>{props.message}</span>
      </Modal.Body>
    </Modal>
  );
};
export default ModalMessage;
