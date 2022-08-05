import React, { useState } from "react";
import signupImage from "../../../Images/signup.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../shared/Loading/Loading";
import useAlert from './../../../hooks/useAlert';

const Register = () => {
  const {simpleAlert} = useAlert();
  const [incorrectConfirmPassword, setIncorrectConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, registerError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async (data) => {
    const password = data?.password;
    const confirmPassword = data?.confirmPassword;
    const email = data?.email;

    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);

      if (!registerError?.code === "auth/email-already-in-use") {
        const url = `http://localhost:5000/register`;
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
      else{
        simpleAlert({
          text : 'The email is already used. Try another email',
          symbol : 'error',
          title : 'Register error'
        });
      }
    } 
    else {
      setIncorrectConfirmPassword("Password & confirm password not match.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-12 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 bg-white rounded shadow-md">
        <div className="w-full max-w-md">
          <img src={signupImage} alt="" />
        </div>

        <div className="w-full max-w-md p-5">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div className="flex items-center space-x-3 mt-8 justify-center w-full">
            <button className=" w-10 h-10 bg-[#DB4437] hover:bg-[#852f27] rounded-full">
              <i className="fa-brands fa-google text-white text-2xl"></i>
            </button>

            <button className=" w-10 h-10 bg-[#3b5998] hover:bg-[#4c71bf] rounded-full">
              <i className="fa-brands fa-facebook-f text-2xl text-white"></i>
            </button>

            <button className=" w-10 h-10 bg-[#3b5998] hover:bg-[#4c71bf] rounded-full">
              <i className="fa-brands fa-linkedin-in text-2xl text-white"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="input-box w-full border-gray-400"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors?.name && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.name?.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input-box w-full border-gray-400"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {errors?.email && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.email?.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input-box w-full border-gray-400"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />

              {errors?.password && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.password?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input-box w-full border-gray-400"
                {...register("confirmPassword", {
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character",
                  },
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                })}
              />

              {errors?.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {errors?.confirmPassword?.message ||
                      incorrectConfirmPassword}
                  </span>
                </label>
              )}

              {incorrectConfirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-red-600">
                    {incorrectConfirmPassword}
                  </span>
                </label>
              )}
            </div>

            <button className="form-btn w-full mt-3">Submit</button>
          </form>

          <p className="mt-2 text-center">
            Already have an account?
            <strong>
              <Link to="/login"> login</Link>
            </strong>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Register;