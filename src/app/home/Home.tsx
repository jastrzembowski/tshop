import bg from "../../assets/Bitmap.jpg";
import "./home.scss";
import Login from "../components/Login";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { useEffect } from "react";
import { fetchCurrentUser } from "../../api/accountSlice";

export default function Home() {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state=>state.account)

  useEffect(()=>{
    !user && dispatch(fetchCurrentUser())
  }, [])
  
  return (
    <div className="home-page">
      <img src={bg} alt="join tsh background"></img>
      <div className="login-container">
        <h1>join.tsh.io</h1>
        <Login/>
      </div>
    </div>
  );
}
