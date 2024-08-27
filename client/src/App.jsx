import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { login, logout } from "./store/authSlice";
import { refreshTokenIfNeeded } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshTokenIfNeeded());
    currentUser();
  }, [dispatch]);
  const currentUser = async () => {
    await axios
      .get("http://localhost:8000/api/v1/users/current-user", {
        withCredentials: true,
      })
      .then((data) => {
        // console.log(data.data.data);
        if (data) {
          dispatch(login(data.data.data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  };
  return !loading ? (
    <>
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : (
    "Loading..."
  );
}

export default App;
