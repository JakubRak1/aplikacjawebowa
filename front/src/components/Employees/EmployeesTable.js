import { useState } from "react";
import ModalEditEmployee from "../Modals/Employees/ModalEditEmployee";
import ModalDeleteOneRecord from "../Modals/utility/ModalDeleteOneRecord";
import "../../static/styles/schoolTable.css";

const EmployeesTable = ({
  id,
  name,
  surname,
  team,
  onCheckboxChange,
  user,
  teams,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleOpenModalEdit = () => {
    setModalEditOpen(true);
  };

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleCheckboxChange = (event) => {
    onCheckboxChange(event.target.value, event.target.checked);
  };

  return (
    <>
      <tr key={id}>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{team}</td>
        {user.admin_rights !== "0" ? (
          <td>
            <div className="d-flex flex-row justify-content-around">
              <div className="checkbox-wrapper-19">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  value={id}
                  id={"cb" + id}
                />
                <label for={"cb" + id} className="check-box" />
              </div>
              <button className="action-btn" onClick={handleOpenModalDelete}>
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
      <ModalEditEmployee
        modalEditOpen={modalEditOpen}
        setModalEditOpen={setModalEditOpen}
        id={id}
        name={name}
        surname={surname}
        team={team}
        teams={teams}
      />
      <ModalDeleteOneRecord
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        id={id}
        type={"employees"}
      />
    </>
  );
};

export default EmployeesTable;
