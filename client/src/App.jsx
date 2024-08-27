import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser();
  }, []);
  const currentUser = async () => {
    await axios
      .get("http://localhost:8000/api/v1/users/current-user",{withCredentials:true  })
      .then((data) => console.log(data));
  };
  return (
    <>
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
