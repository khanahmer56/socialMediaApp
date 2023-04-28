import { FormHelperText, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../utils/formValidation";
import { useLogin, useRegister } from "../hooks/auth";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registers } = useRegister();
  const onSubmit = (data) => {
    registers({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  };
  console.log(errors);
  return (
    <div className="flex items-center justify-center h-screen mx-4">
      <div className="w-[400px] h-[400px] py-2 px-4 border-[1px] border-black rounded-md">
        <h2 className="font-bold text-3xl text-center">Sign Up</h2>
        <form
          className="flex flex-col gap-8 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <TextField
              id="outlined-basic"
              label="UserName"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("username", usernameValidation)}
            />
            <FormHelperText sx={{ color: "red", ml: 2 }}>
              {errors.username?.message}
            </FormHelperText>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("email", emailValidation)}
            />
            <FormHelperText sx={{ color: "red", ml: 2 }}>
              {errors.email?.message}
            </FormHelperText>
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("password", passwordValidation)}
            />
            <FormHelperText sx={{ color: "red", ml: 2 }}>
              {errors.password?.message}
            </FormHelperText>
          </div>
          <button className="bg-black text-white py-2 rounded-md">
            Sign Up
          </button>
        </form>
        <div className="flex justify-between items-center flex-1 mt-8">
          <p className="text-start">Already have an account ?</p>
          <Link to="/login" className="text-1xl text-blue-500  p-2">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
