import { useState } from "react";
import ModalEditSchool from "../Modals/Schools/ModalEditSchool";
import ModalDeleteOneRecord from "../Modals/utility/ModalDeleteOneRecord";
import "../../static/styles/schoolTable.css";

const SchoolsTable = ({
  id,
  schoolName,
  streetName,
  buildingNumber,
  phoneNumber,
  additionalInformation,
  onCheckboxChange,
  user,
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
        <td>{schoolName}</td>
        <td>{streetName}</td>
        <td>{buildingNumber}</td>
        <td>{phoneNumber}</td>
        <td>{additionalInformation}</td>
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
      <ModalEditSchool
        modalEditOpen={modalEditOpen}
        setModalEditOpen={setModalEditOpen}
        id={id}
        schoolName={schoolName}
        streetName={streetName}
        buildingNumber={buildingNumber}
        phoneNumber={phoneNumber}
        additionalInformation={additionalInformation}
      />
      <ModalDeleteOneRecord
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        id={id}
        type={"schools"}
      />
    </>
  );
};

export default SchoolsTable;
