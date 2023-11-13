import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../api/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "../../api/accountSlice";
import Loader from "../../ui/loader/Loader";

export default function Login() {
  const dispatch = useAppDispatch();
  const { status, loginError } = useAppSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    await dispatch(login(data));
  }

  const sx = {
    width: "496px",
    fontSize: "14px",
    color: "#E0E2EA",
    fontWeight: 600,
    "@media (max-width:800px)": {
      maxWidth: "496px",
      width: "100%",
    },
  };
  return (
    <form className="login-box" onSubmit={handleSubmit(submitForm)}>
      <h2>Login </h2>
      {status.includes("pendingLogin") ? (
        <Loader />
      ) : (
        <>
          {loginError && <p className="login-error">Error while logging in</p>}

          <p>Username</p>
          <TextField
            sx={sx}
            defaultValue={""}
            InputLabelProps={{ shrink: false }}
            placeholder="Enter username"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <p>Password</p>
          <TextField
            type="password"
            sx={sx}
            InputLabelProps={{ shrink: false }}
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />
        </>
      )}
      <button type="submit" disabled={status.includes("pendingLogin")}>
        Log in
      </button>
      <p className="forgot-password">Forgot password?</p>
    </form>
  );
}
