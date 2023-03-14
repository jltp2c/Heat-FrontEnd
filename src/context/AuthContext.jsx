import { createContext, useState, useEffect } from "react";
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
      // console.log("current token is:", currentToken);
      if (!currentToken) {
        setUser(null);
        setIsloading(false);
        return;
      }
      const response = await myApi.get("/api/auth/", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      // console.log(
      //   "response from myApi.get('/api/auth/') is",
      //   response.data.hasProfile
      // );
      if (response.status === 200) {
        const { data: profile } = await myApi.get("/api/board/profile", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (profile) {
          delete profile.user;
          response.data.profile = profile;
        }
        setUser(response.data);

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

  // console.log("user is", user);
  return (
    <AuthContext.Provider
      value={{
        storeToken,
        user,
        setUser,
        authenticateUser,
        removeToken,
        token,
        getToken,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
