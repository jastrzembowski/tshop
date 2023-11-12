import bg from "../../assets/Bitmap.jpg";
import "./home.scss";
import Login from "../components/Login";

export default function Home() {
  return (
    <div className="home-page">
      <img src={bg} alt="join tsh background"></img>
      <div className="login-container">
        <h1>join.tsh.io</h1>
        <Login />
      </div>
    </div>
  );
}
