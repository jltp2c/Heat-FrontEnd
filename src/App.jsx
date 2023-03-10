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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Presentation />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/profile" element={<Profile />} />
          <Route path="/board/foods" element={<Food />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
