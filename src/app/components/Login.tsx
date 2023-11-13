import { TextField } from "@mui/material";
import { useAppDispatch } from "../../api/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "../../api/accountSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    await dispatch(login(data));
  }

  console.log(getValues("username"));
  return (
    <form className="login-box" onSubmit={handleSubmit(submitForm)}>
      <h2>Login </h2>
      <p>Username</p>
      <TextField
        sx={{
          width: "496px",
          fontSize: "14px",
          color: "#E0E2EA",
          fontWeight: 600,
        }}
        defaultValue={""}
        InputLabelProps={{ shrink: false }}
        placeholder="Enter username"
        {...register("username", { required: "Username is required" })}
      />
      <p>Password</p>
      <TextField
        type="password"
        sx={{
          width: "496px",
          fontSize: "14px",
          color: "#E0E2EA",
          fontWeight: 600,
        }}
        InputLabelProps={{ shrink: false }}
        placeholder="Enter password"
        {...register("password", { required: "Password is required" })}
      />
      <button type="submit">Log in</button>
      <p className="forgot-password">Forgot password?</p>
    </form>
  );
}
