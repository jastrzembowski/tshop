import bg from "../../assets/Bitmap.jpg";
import "./home.scss";
import Login from "../components/Login";
import { Link } from "react-router-dom";


export default function Home() {

  return (
    <div className="home-page">
      <img src={bg} alt="join tsh background"></img>
      <div className="login-container">
        <Link to="/home">join.tsh.io</Link>
        <Login />
      </div>
    </div>
  );
}
