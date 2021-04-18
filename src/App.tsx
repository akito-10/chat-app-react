import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Main from "./components/Main";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase/firebase";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unSub();
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className="App">
          <Main />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
