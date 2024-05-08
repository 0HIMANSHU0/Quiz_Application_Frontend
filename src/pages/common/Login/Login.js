import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        localStorage.setItem("token", response.data);
        message.success(response.message);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="card w-400 p-3 bg-white ">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <h1 className="text-2xl">ONLINE QUIZ - LOGIN</h1>
            <i class="ri-login-box-fill"></i>
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" placeholder="Enter Your Email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" placeholder="Enter Your Password" />
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-1 w-100"
              >
                LOGIN
              </button>
              <Link to="/register" className="underline">
                Not a Member? Register Here!
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <div className="p-2 m-1">
        <dotlottie-player
          src="https://lottie.host/ff5697b8-e0a3-4fba-8414-979e27dc17a0/sEWAjJhgSF.json"
          background="transparent"
          speed="1"
          style={{ width: "400px", height: "400px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}

export default Login;
