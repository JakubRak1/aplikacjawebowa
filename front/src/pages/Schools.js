import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/apiConfig";
import ConnectionError from "../components/ConectionError";
import SchoolsTable from "../components/Schools/SchoolsTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBarSchool from "../components/Schools/ActionBarSchool";
import "../static/styles/schools.css";

// const URL_SCHOOLS = "/schools";

const Schools = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const location = useLocation();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(
        location.pathname + window.location.search
      );
      if (response.status === 200) {
        setIsLoading(false);
        setData(response.data);
      }
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
    }
  };

  const handleIdDeleteChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  // Check for user login
  if (user) {
    // Check for connection
    if (!errMsg) {
      if (isLoading) {
        return <LoadingIcon />;
      } else {
        return (
          <section>
            <ActionBarSchool idToDelete={selectedIds} user={user} />
            <div className="d-flex justify-content-center mt-5">
              <table className="table table-content">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Ulica</th>
                    <th scope="col">Numer budynku</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Dodatkowe informacje</th>
                    {user.admin_rights !== "0" ? (
                      <th scope="col">Opcje</th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((school) => (
                    <SchoolsTable
                      key={school.id}
                      id={school.id}
                      schoolName={school.schoolName}
                      streetName={school.streetName}
                      buildingNumber={school.buildingNumber}
                      phoneNumber={school.phoneNumber}
                      additionalInformation={school.additionalInformation}
                      onCheckboxChange={handleIdDeleteChange}
                      user={user}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      }
    } else {
      return (
        <>
          {isLoading ? <LoadingIcon /> : <ConnectionError errorMsg={errMsg} />}
        </>
      );
    }
  } else
    return (
      <ConnectionError errorMsg={"Musisz być zalogowany aby przejść dalej"} />
    );
};
export default Schools;
