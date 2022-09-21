import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Router;
