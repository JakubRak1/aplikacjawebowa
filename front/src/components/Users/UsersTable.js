import { useState } from "react";
import ModalEditPassword from "../Modals/Users/ModalEditPassword";
import ModalEditAdminRights from "../Modals/Users/ModalEditAdminRights";
import ModalDeleteOneRecord from "../Modals/utility/ModalDeleteOneRecord";

import "../../static/styles/schoolTable.css";

const UsersTable = ({ id, username, admin_rights }) => {
  const [modalAminRightsOpen, setModalAdminRightsOpen] = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleOpenModalEdit = () => {
    setModalAdminRightsOpen(true);
  };

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleOpenModalPassword = () => {
    setModalPasswordOpen(true);
  };

  return (
    <>
      <tr key={id}>
        <td>{username}</td>
        <td>{admin_rights === 0 ? "Przeglądający" : "Edytor"}</td>
        <td>
          <div className="d-flex flex-row justify-content-around">
            <button className="action-btn" onClick={handleOpenModalDelete}>
              Usuń
            </button>
            <button className="action-btn" onClick={handleOpenModalPassword}>
              Zmień hasło
            </button>
            <button className="action-btn" onClick={handleOpenModalEdit}>
              Zmień uprawnienia
            </button>
          </div>
        </td>
      </tr>
      <ModalEditPassword
        modalPasswordOpen={modalPasswordOpen}
        setModalPasswordOpen={setModalPasswordOpen}
        id={id}
        username={username}
      />
      <ModalDeleteOneRecord
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        id={id}
        type={"users"}
      />
      <ModalEditAdminRights
        modalAminRightsOpen={modalAminRightsOpen}
        setModalAdminRightsOpen={setModalAdminRightsOpen}
        id={id}
        username={username}
        admin_rights={admin_rights}
      />
    </>
  );
};

export default UsersTable;
