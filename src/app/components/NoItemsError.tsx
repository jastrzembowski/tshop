import empty from "../../assets/Group.svg";

interface Props{
  text: string
}

export default function NoItemsError({text}: Props) {
  return (
    <div className="empty-box">
      <img src={empty} alt="icon" />
      <h1> Ooops... It's empty here</h1>
      <p> {text}</p>
    </div>
  );
}
