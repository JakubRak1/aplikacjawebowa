import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/apiConfig";
import ConnectionError from "../components/ConectionError";
import EmployeesTable from "../components/Employees/EmployeesTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBarEmployess from "../components/Employees/ActionBarEmployees";
import "../static/styles/schools.css";

const Employees = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);
  const [allTeams, setAllTeams] = useState("");

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let teamsArray = [];
    try {
      const response = await api.get(
        location.pathname + window.location.search
      );
      if (response.status === 200) {
        setIsLoading(false);
        const data = response.data.data;
        setData(data);

        data.forEach((object) => {
          teamsArray.push(object.team);
        });
        teamsArray = [...new Set(teamsArray)];
        setAllTeams(teamsArray);
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
            <ActionBarEmployess
              idToDelete={selectedIds}
              user={user}
              teams={allTeams}
            />
            <div className="d-flex justify-content-center mt-5">
              <table className="table table-content">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Imie</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Zespół</th>
                    {user.admin_rights !== "0" ? (
                      <th scope="col">Opcje</th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((employee) => (
                    <EmployeesTable
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      surname={employee.surname}
                      team={employee.team}
                      onCheckboxChange={handleIdDeleteChange}
                      user={user}
                      teams={allTeams}
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
export default Employees;
