import { createContext, useState, Useffect, useEffect } from "react";
import myApi from "../service/service";
export const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  //Adds a "token" key with the "receivedToken " value to the received token
  function storeToken(receivedToken) {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  }

  // Retrieves the item depending on the key stored in localStorage
  function getToken() {
    return localStorage.getItem("token");
  }

  //Deletes the item from localStorage based on its key
  function removeToken() {
    localStorage.removeItem("token");
  }

  async function authenticateUser() {
    try {
      const currentToken = getToken();
      setToken(currentToken);
      console.log("current token is:", currentToken);
      if (!currentToken) {
        return setUser("no token found", null);
      }
      const response = await myApi.get("/api/auth/", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      console.log("response from myApi.get('/api/auth/') is", response);
      if (response.status === 200) {
        setUser(response.data);
        console.log("response.data is:", response.data);
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsloading(false);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  console.log("user is", user);
  return (
    <AuthContext.Provider
      value={{ storeToken, user, authenticateUser, removeToken, token }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
