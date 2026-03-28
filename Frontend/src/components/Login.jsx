import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../config/api";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await API
      .post('/users/login', userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate('/')
          toast.success("Logged in Successfully");
        }
        // Modal close karo
        const modal = document.getElementById("my_modal_5");
        if (modal) {
          modal.close(); // showModal() ki jagah close()
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("This is an error!" + err.response.data.message);
        }
      });
  };
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-slate-800 transition-colors duration-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg dark:text-white">Login</h3>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-300">Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-80 px-3 py-2 rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white border dark:border-slate-600"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-300">Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-2 rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white border dark:border-slate-600"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Button */}
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-black text-white rounded-md px-3 py-1 hover:bg-gray-400 duration-300 cursor-pointer"
              >
                Login
              </button>
              <p className="dark:text-gray-300">
                Not Registered ?{" "}
                <Link
                  to={"/Signup"}
                  className="underline text-blue-500 cursor-pointer"
                >
                  Sign Up{" "}
                </Link>
              </p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button type="submit" className="btn">
                  Close
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;
