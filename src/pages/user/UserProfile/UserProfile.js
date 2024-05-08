import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { useSelector } from "react-redux";
import moment from "moment";
import { getSingleUser } from "../../../apicalls/users";
import { useParams } from "react-router-dom";
import { message } from "antd";

function UserProfile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.users);

  const getSingleUserData = async () => {
    try {
      const response = await getSingleUser({ userId: params.id });
      if (response.success) {
        setUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageTitle title="User Profile" />
      <div className="divider"></div>

      {user?.isAdmin ? (
        <>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col card p-1 w-25 pointer">
              <div className="profile-img flex justify-center items-center">
                <dotlottie-player
                  src="https://lottie.host/ebd6e98e-0f58-4f26-ba4d-5c711a64b7cf/X3mVtj1Ku1.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "200px", height: "200px" }}
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg">Name : {userData?.name}</h1>
                <span className="text-lg">Email : {userData?.email}</span>
                <span className="text-lg">
                  Created At :{" "}
                  {moment(userData?.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex justify-center items-center  ">
            <div className="flex flex-col card p-1 w-25 pointer">
              <div className="profile-img flex justify-center items-center">
                <dotlottie-player
                  src="https://lottie.host/ebd6e98e-0f58-4f26-ba4d-5c711a64b7cf/X3mVtj1Ku1.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "200px", height: "200px" }}
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <h1 className="text-lg">Name : {user?.name}</h1>
                <span className="text-lg">Email : {user?.email}</span>
                <span className="text-lg">
                  Created At : {moment(user?.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
