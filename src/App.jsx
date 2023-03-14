import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "../src/pages/Layout/Layout";
import Board from "../src/pages/Board/Board";
import CreateProfile from "../src/pages/CreateProfile/CreateProfile";
import Error from "../src/pages/Error/Error";
import Food from "../src/pages/Food/Foods";
import Login from "../src/pages/Login/Login";
import Presentation from "../src/pages/Presentation/Presentation";
import Profile from "../src/pages/Profile/Profile";
import Signup from "../src/pages/Signup/Signup";
import ProtectedRoute from "./pages/Navigation/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import IsLoggedIn from "./pages/Navigation/IsLoggedIn";
import HasProfile from "./pages/Navigation/HasProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<IsLoggedIn />}>
          <Route path="/" element={<Presentation />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<HasProfile />}>
            <Route path="/createprofile" element={<CreateProfile />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/board" element={<Board />} />
            <Route path="/board/profile" element={<Profile />} />
            <Route
              path="/board/profile/update/:id"
              element={<UpdateProfile />}
            />

            <Route path="/board/foods" element={<Food />} />
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
