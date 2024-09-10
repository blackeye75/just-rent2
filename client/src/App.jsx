// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { login, logout } from "./store/authSlice";
// import { refreshTokenIfNeeded } from "./store/authSlice";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(refreshTokenIfNeeded());
//     currentUser();
//   }, [dispatch]);
//   const currentUser = async () => {
//     await axios
//       .get("http://localhost:8000/api/v1/users/current-user", {
//         withCredentials: true,
//       })
//       .then((data) => {
//         // console.log(data.data.data);
//         if (data) {
//           dispatch(login(data.data.data));
//         } else {
//           dispatch(logout());
//         }
//       })
//       .finally(() => setLoading(false));
//   };
//   return !loading ? (
//     <>
//       <div className="w-full block">
//         <Header />
//         <main>
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </>
//   ) : (
//     "Loading..."
//   );
// }

// export default App;


// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { login, logout, refreshTokenIfNeeded } from "./store/authSlice";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         // Attempt to refresh token
//         await dispatch(refreshTokenIfNeeded());

//         // Fetch current user data if the token is valid
//         await currentUser();
//       } catch (error) {
//         console.error("Initialization error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeApp();
//   }, [dispatch]);

//   const currentUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/users/current-user", {
//         withCredentials: true,
//       });

//       if (response.data) {
//         dispatch(login(response.data.data)); // Assuming user data is in `response.data.data`
//       } else {
//         dispatch(logout());
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.log("User is unauthorized. Logging out.");
//         dispatch(logout());
//       } else {
//         console.error("Error fetching current user:", error);
//       }
//     }
//   };

//   return !loading ? (
//     <>
//       <div className="w-full block">
//         <Header />
//         <main>
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </>
//   ) : (
//     "Loading..."
//   );
// }

// export default App;


import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { login, logout, refreshTokenIfNeeded } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Attempt to refresh token
        await dispatch(refreshTokenIfNeeded());

        // Fetch current user data if the token is valid
        await currentUser();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  const currentUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/current-user", {
        withCredentials: true,
      });

      if (response.data) {
        dispatch(login(response.data.data)); // Assuming user data is in `response.data.data`
      } else {
        dispatch(logout());
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User is unauthorized. Logging out.");
        dispatch(logout());
      } else {
        console.error("Error fetching current user:", error);
      }
    }
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

