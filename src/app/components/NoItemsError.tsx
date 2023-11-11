import empty from "../../assets/Group.svg";

export default function NoItemsError() {
  return (
    <div className="empty-box">
      <img src={empty} alt="icon" />
      <h1> Ooops... It's empty here</h1>
      <p> There are no products on the list</p>
    </div>
  );
}
