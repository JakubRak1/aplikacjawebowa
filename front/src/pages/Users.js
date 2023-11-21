import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/apiConfig";
import ConnectionError from "../components/ConectionError";
import UsersTable from "../components/Users/UsersTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBarUsers from "../components/Users/ActionBarUsers";
import "../static/styles/schools.css";

const Users = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
        const data = response.data.data;
        setData(data);
      }
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
    }
  };

  // Check for user login
  if (user && user.admin_rights === "2") {
    // Check for connection
    if (!errMsg) {
      if (isLoading) {
        return <LoadingIcon />;
      } else {
        return (
          <section>
            <ActionBarUsers />
            <div className="d-flex justify-content-center mt-5">
              <table className="table table-content">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Nazwa użytkownika</th>
                    <th scope="col">Uprawnienia</th>
                    <th scope="col">Opcje</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((users) => (
                    <UsersTable
                      key={users.id}
                      id={users.id}
                      username={users.username}
                      admin_rights={users.admin_rights}
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
      <ConnectionError
        errorMsg={
          "Musisz być zalogowany aby przejść dalej lub nie masz uprawnień do tej strony!"
        }
      />
    );
};
export default Users;
