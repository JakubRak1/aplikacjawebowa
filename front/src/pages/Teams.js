import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/apiConfig";
import ConnectionError from "../components/ConectionError";
import TeamsTable from "../components/Teams/TeamsTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBarTeams from "../components/Teams/ActionBarTeams";
import "../static/styles/schools.css";

const Teams = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

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

  // Check for user login
  if (user) {
    // Check for connection
    if (!errMsg) {
      if (isLoading) {
        return <LoadingIcon />;
      } else {
        return (
          <section>
            <ActionBarTeams user={user} />
            <div className="d-flex justify-content-center mt-5">
              <table className="table table-content">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Zespół</th>
                    <th scope="col">Liczba pracowników</th>
                    {user.admin_rights !== "0" ? (
                      <th scope="col">Opcje</th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((team) => (
                    <TeamsTable
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      employees={team.employees}
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
export default Teams;
