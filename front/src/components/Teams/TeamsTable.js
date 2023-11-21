import { useState } from "react";
import ModalEditTeam from "../Modals/Teams/ModalEditTeam";
import ModalDeleteOneRecord from "../Modals/utility/ModalDeleteOneRecord";
import ModalMessageNoReaload from "../Modals/utility/ModalMessageNoReload";
import "../../static/styles/schoolTable.css";

const TeamsTable = ({ id, name, employees, user, teams }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenModalEdit = () => {
    setModalEditOpen(true);
  };

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleErrorDelete = () => {
    setMessage(
      "Aby moźliwe było usunięcie zespołu najpierw należy zmienić pracownikom zespół na inny niż usuwany"
    );
    setModalMessageOpen(true);
  };

  return (
    <>
      <tr key={id}>
        <td>{name}</td>
        <td>{employees}</td>
        {user.admin_rights !== "0" ? (
          <td>
            <div className="d-flex flex-row justify-content-around">
              <button
                className="action-btn"
                onClick={
                  employees !== 0 ? handleErrorDelete : handleOpenModalDelete
                }
              >
                Usuń
              </button>
              <button className="action-btn" onClick={handleOpenModalEdit}>
                Edytuj
              </button>
            </div>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
      <ModalEditTeam
        modalEditOpen={modalEditOpen}
        setModalEditOpen={setModalEditOpen}
        id={id}
        name={name}
      />
      <ModalDeleteOneRecord
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        id={id}
        type={"teams"}
      />
      <ModalMessageNoReaload
        modalMessageOpen={modalMessageOpen}
        message={message}
        setModalMessageOpen={setModalMessageOpen}
      />
    </>
  );
};

export default TeamsTable;
