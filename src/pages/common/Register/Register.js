import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users.js";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice.js";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);
      dispatch(HideLoading());
      // console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl">ONLINE QUIZ - REGISTER</h1>
            <i className="ri-user-add-fill"></i>
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <input type="text" placeholder="Enter Your Name" />
            </Form.Item>
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
                REGISTER
              </button>
              <Link to="/login" className="underline">
                Already a Member? Login Here!
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <div className="p-2 m-1">
        <dotlottie-player
          src="https://lottie.host/5f7d7803-f531-4513-b209-88da865c3cd7/i0uUXAZ8lw.json"
          background="transparent"
          speed="1"
          style={{ width: "350px", height: "350px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}
export default Register;


// import { Form, Row, message, Col } from "antd";
// import FormItem from "antd/es/form/FormItem";
// import React, { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { registerUser } from "../../../apicalls/users";
// import { useDispatch } from "react-redux";
// import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";

// function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const OnFinish = async (values) => {
//     try {
//       dispatch(ShowLoader());
//       const response = await registerUser(values);
//       dispatch(HideLoader());
//       if (response.success) {
//         message.success(response.message);
//         navigate("/login");
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoader());
//       message.error(error.message);
//     }
//   };

//   // Dynamic Dropdown for Universities & colleges
//   const universities = [
//     {
//       name: "Amity University",
//       colleges: [
//         {
//           name: "Amity University, Pachgaon",
//         },
//         {
//           name: "Amity University, Noida",
//         },
//       ],
//     },
//     {
//       name: "Ansal University",
//       colleges: [
//         {
//           name: "Ansal University, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "Bharati Vidhyapeeth ",
//       colleges: [
//         {
//           name: "Bharati Vidhyapeeth Campus, Delhi",
//         },
//         {
//           name: "Bharati Vidhyapeeth Campus, Mumbai",
//         },
//         {
//           name: "Bharati Vidhyapeeth Campus, Pune",
//         },
//       ],
//     },
//     {
//       name: "BML Munjal University",
//       colleges: [
//         {
//           name: "BML Munjal, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "Delhi University",
//       colleges: [
//         {
//           name: "Aditi Mahavidhyala College",
//         },
//         {
//           name: "Bharti College",
//         },
//         {
//           name: "Daulat Ram College",
//         },
//         {
//           name: "Deen Dayal Upadhyaya College",
//         },
//         {
//           name: "Gargi College",
//         },
//         {
//           name: "Hindu College",
//         },
//         {
//           name: "Hansraj College",
//         },
//         {
//           name: "Indraprast College of Women",
//         },
//         {
//           name: "Kirori Mal College",
//         },
//         {
//           name: "Motilal Nehru College",
//         },
//         {
//           name: "P.G.D.A.V College",
//         },
//         {
//           name: "Ram Lal Anand College",
//         },
//         {
//           name: "Ramjas College",
//         },
//         {
//           name: "Satyawati College",
//         },
//         {
//           name: "St. Stephen College",
//         },
//         {
//           name: "Shri Ram College of Commerce",
//         },
//         {
//           name: "Shri Venkanteswara College",
//         },
//         {
//           name: "Swami Shardananda College",
//         },
//         {
//           name: "Vivekananda College",
//         },
//         {
//           name: "Zakir Husaian College",
//         },
//       ],
//     },
//     {
//       name: "Gurugram Univeristy",
//       colleges: [
//         {
//           name: "BM Group of Institutions, Farrukhnagar",
//         },
//         {
//           name: "Dronacharya Govt. College",
//         },
//         {
//           name: "Govt. College, Sidhrawali",
//         },
//         {
//           name: "Govt. College for Girls, Sector-14",
//         },
//         {
//           name: "Govt. P.G College,  Sector-9",
//         },
//         {
//           name: "Govt. College, Sohna",
//         },
//         {
//           name: "KIIT College of Engineering, Bhondsi",
//         },
//         {
//           name: "Rao Lal Singh College, Sidhrawali",
//         },
//         {
//           name: "Suraj Degree College, Bhondsi",
//         },
//       ],
//     },
//     {
//       name: "GD Goenka University",
//       colleges: [
//         {
//           name: "GD Goenka University, Sohna",
//         },
//       ],
//     },
//     {
//       name: "Guru Jambeshwar University,",
//       colleges: [
//         {
//           name: "F.G.M Govt. College, Adampur",
//         },
//         {
//           name: "Govt. College, Hisar",
//         },
//         {
//           name: "Chhaju Ram Memorial Jat College, Hisar",
//         },
//         {
//           name: "S.D. Mahila Mahavidyalya, Hansi",
//         },
//         {
//           name: "Guru Dronacharya Girls College, Adampur",
//         },
//         {
//           name: "Maharani Lakshmi Bai College, Bhiwani",
//         },
//       ],
//     },
//     {
//       name: "IILM University",
//       colleges: [
//         {
//           name: "IILM University, Gurgaon",
//         },
//         {
//           name: "IILM University, Greater Noida",
//         },
//       ],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       colleges: [
//         {
//           name: "Indian Institute of Information Technology, Sonepath",
//         },
//       ],
//     },
//     {
//       name: "Indian Institute of Management",
//       colleges: [
//         {
//           name: "Indian Institute of Management, Rohtak",
//         },
//       ],
//     },
//     {
//       name: "IP University",
//       colleges: [
//         {
//           name: "Ambedkar Institute of Advanced Technologies & Research, Delhi ",
//         },
//         {
//           name: "C-DAC, Noida",
//         },
//         {
//           name: "Delhi Institute of Heritage Research & Management, New Delhi",
//         },
//         {
//           name: "ESIC Dental College, Rohini, New Delhi ",
//         },
//         {
//           name: "Aryabhatt Institute of Technology, Shakti Nagar,",
//         },
//         {
//           name: "Army Institute of Management & Technology, Greater Noida",
//         },
//         {
//           name: "GURU NANAK COLLEGE OF EDUCATION, Punjabi Bagh",
//         },
//       ],
//     },
//     {
//       name: "K.R Mangalam University",
//       colleges: [
//         {
//           name: "K.R Mangalam University, Sohna",
//         },
//       ],
//     },
//     {
//       name: "Maharishi Dayanand University",
//       colleges: [
//         {
//           name: "IBMR Business School, Gurgaon",
//         },
//         {
//           name: "DAV Institute of Management, Faridabad",
//         },
//         {
//           name: "Institute of Management and Technology Faridabad",
//         },
//         {
//           name: "Brij Mohan Institute of Management and Technology, Gurgaon",
//         },
//         {
//           name: "St. Andrews Institute of Technology and Management, Gurgaon",
//         },
//         {
//           name: "Mewat Engineering College, Mewat",
//         },
//         {
//           name: "World College of Technology and Management, Gurgaon",
//         },
//         {
//           name: "DPG Institute of Technology and Management, Gurgaon",
//         },
//         {
//           name: "Bharat Institute of Technology, Sonepat",
//         },
//         {
//           name: "Dronacharya Government College, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "Mahnav Rachna University",
//       colleges: [
//         {
//           name: "Manav Rachna University, Faridabad",
//         },
//         {
//           name: "Manav Rachna University, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "O.P Jindal University",
//       colleges: [
//         {
//           name: "O.P Jindal University, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "The NorthCap University",
//       colleges: [
//         {
//           name: "The NorthCap University, Gurgaon",
//         },
//       ],
//     },
//     {
//       name: "YMCA University",
//       colleges: [
//         {
//           name: "Aravali College of Engineering & Management, Faridabad",
//         },
//         {
//           name: "B.S. Anangpuria Institute of Technology & Management, Faridabad",
//         },
//         {
//           name: "Echelon Institute of Technology, Faridabad",
//         },
//         {
//           name: "Rawal Institute of Engineering & Technology, Faridabad",
//         },
//         {
//           name: "Satyug Darshan Institute of Engineering & Technology, Faridabad",
//         },
//         {
//           name: "Advanced Institute of Technology & Management, Palwal",
//         },
//         {
//           name: "Delhi College of Technology & Management, Palwal",
//         },
//         {
//           name: "NGF College of Engineering & Technology, Palwal",
//         },
//         {
//           name: "Shri Ram College of Engineering & Management, Palwal",
//         },
//         {
//           name: "National Power Training lnstitute, Sector-33, Faridabad",
//         },
//       ],
//     },
//   ];

//   // Dynamic Dropdown for courses , sessions & semesters
//   const courses = [
//     {
//       name: "BCA",
//       // semester:[1,2,3,4,5,6]
//       sessions: [
//         {
//           name: "2021-2024",
//           semesters: [1, 2, 3, 4, 5, 6],
//         },
//         {
//           name: "2022-2025",
//           semesters: [1, 2, 3, 4, 5, 6],
//         },
//         {
//           name: "2023-2026",
//           semesters: [1, 2, 3, 4, 5, 6],
//         },
//         {
//           name: "2024-2027",
//           semesters: [1, 2, 3, 4, 5, 6],
//         },
//       ],
//     },
//     {
//       name: "MCA",
//       // semester:[1,2,3,4,5,6]
//       sessions: [
//         {
//           name: "2022-2024",
//           semesters: [1, 2, 3, 4],
//         },
//         {
//           name: "2023-2025",
//           semesters: [1, 2, 3, 4],
//         },
//         {
//           name: "2024-2026",
//           semesters: [1, 2, 3, 4],
//         },
//       ],
//     },
//     {
//       name: "B.TECH",
//       // semester:[1,2,3,4,5,6]
//       sessions: [
//         {
//           name: "2020-2024",
//           semesters: [1, 2, 3, 4, 5, 6, 7, 8],
//         },
//         {
//           name: "2021-2025",
//           semesters: [1, 2, 3, 4, 5, 6, 7, 8],
//         },
//         {
//           name: "2022-2026",
//           semesters: [1, 2, 3, 4, 5, 6, 7, 8],
//         },
//         {
//           name: "2023-2027",
//           semesters: [1, 2, 3, 4, 5, 6, 7, 8],
//         },
//         {
//           name: "2024-2028",
//           semesters: [1, 2, 3, 4, 5, 6, 7, 8],
//         },
//       ],
//     },
//     {
//       name: "M.TECH",
//       // semester:[1,2,3,4,5,6]
//       sessions: [
//         {
//           name: "2022-2024",
//           semesters: [1, 2, 3, 4],
//         },
//         {
//           name: "2023-2025",
//           semesters: [1, 2, 3, 4],
//         },
//         {
//           name: "2024-2026",
//           semesters: [1, 2, 3, 4],
//         },
//       ],
//     },
//   ];

//   const [course, setCourse] = useState("Course");
//   const [session, setSession] = useState("Session");
//   const [semester, setSemester] = useState("Semester");
//   const [university, setUniversity] = useState("University");
//   const [college, setCollege] = useState("College");

//   const changeUniversity = (event) => {
//     setUniversity(event.target.value);
//     setColleges(
//       universities.find((uni) => uni.name === event.target.value).colleges
//     );
//   };
//   function changeCollege(event) {
//     setCollege(event.target.value);
//   }

//   const changeCourse = (event) => {
//     setCourse(event.target.value);
//     setSessions(
//       courses.find((crs) => crs.name === event.target.value).sessions
//     );
//   };

//   const changeSession = (event) => {
//     setSession(event.target.value);
//     setSemesters(
//       sessions.find((session) => session.name === event.target.value).semesters
//     );
//   };

//   function changeSemester(event) {
//     setSemester(event.target.value);
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL + "login-bgimg.jpg"})`,
//         backgroundSize: "cover",
//       }}
//       className="flex justify-center item-center h-screen w-screen"
//     >
//       <div className="card w-400 p-3 bg-white register">
//         <div className="flex flex-col ">
//           <h1 className="text-2xl p-1">REGISTER</h1>
//           <div className="divider"></div>

//           <Form layout="inline" className="p-1" onFinish={OnFinish}>
//             <div className="card1">
//               <Col gutter={[10, 20]}>
//                 <Row className="p-1" span={12}>
//                   <FormItem name="name" label="Name">
//                     <input type="text"  style={{marginLeft: "38px"}}/>
//                   </FormItem>
//                 </Row>
//                 <Row className="p-1" span={12}>
//                   <FormItem name="email" label="Email">
//                     <input type="text" style={{marginLeft: "40px"}} />
//                   </FormItem>
//                 </Row>
//                 <Row className="p-1" span={12}>
//                   <FormItem name="password" label="Password">
//                     <input type="password" style={{paddingLeft: "33px",marginLeft:"12px"}}/>
//                   </FormItem>
//                 </Row>
//                 <Row className="p-1" span={12}>
//                   <FormItem name="rollno" label="Roll No">
//                     <input type="number" style={{paddingLeft: "25px",marginLeft: "29px"}}/>
//                   </FormItem>
//                 </Row>
//                 <Row className="p-1" span={12}>
//                   <FormItem name="phoneno" label="Phone No">
//                     <input type="tel" maxlength={10} style={{paddingLeft: "35px",marginLeft: "8px"}}/>
//                   </FormItem>
//                 </Row>
//               </Col>
//             </div>
//             {/*  */}
//             {/*  */}
//             {/*  */}
//             <div>
//               <Col gutter={[10, 20]}>
//                 <Row className="p-1">
//                   <Form.Item label="University" name="university">
//                     <select value={university} onChange={changeUniversity} style={{marginLeft: "20px"}}>
//                       <option>University</option>
//                       {universities.map((uni) => (
//                         <option value={uni.name}>{uni.name}</option>
//                       ))}
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="College" name="college">
//                     <select value={college} onChange={changeCollege} style={{marginLeft: "37px"}}>
//                       <option>College</option>
//                       {colleges.map((college) => (
//                         <option value={college.name}>{college.name}</option>
//                       ))}
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="Courses" name="course">
//                     <select value={course} onChange={changeCourse} style={{marginLeft: "34px"}}>
//                       <option>Course</option>
//                       {courses.map((crs) => (
//                         <option value={crs.name}>{crs.name}</option>
//                       ))}
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="Session" name="session">
//                     <select value={session} onChange={changeSession} style={{marginLeft: "36px"}}>
//                       <option>Session</option>
//                       {sessions.map((session) => (
//                         <option value={session.name}>{session.name}</option>
//                       ))}
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="Semester" name="semester">
//                     <select value={semester} onChange={changeSemester} style={{marginLeft: "23px"}}>
//                       <option>Semester</option>
//                       {semesters.map((semester) => (
//                         <option value={semester}>{semester}</option>
//                       ))}
//                     </select>
//                   </Form.Item>
//                 </Row>
//               </Col>
//             </div>

//             {/* <div>
//               <Col gutter={[10, 20]}>
//                 <Row className="p-1">
//                   <Form.Item label="University" name="university">
//                     <select name="" id="">
//                       <option value="">Select University</option>
//                       <option value="Delhi University">Delhi University</option>
//                       <option value="Maharshi Dayanand University">
//                         Maharshi Dayanand University
//                       </option>
//                       <option value="Indraprasta University">
//                         Indraprasta University
//                       </option>
//                       <option value="GD Goenka University">
//                         GD Goenka University
//                       </option>
//                       <option value="Manav Rachna University">
//                         Manav Rachna University
//                       </option>
//                       <option value="Gurgrgam University">
//                         Gurgrgam University
//                       </option>
//                       <option value="KR Mangalam University">
//                         KR Mangalam University
//                       </option>
//                       <option value="Sushant University">
//                         Sushant University
//                       </option>
//                       <option value="Ansal University">Ansal University</option>
//                       <option value="SGT University">SGT University</option>
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="College" name="college">
//                     <select name="" id="">
//                       <option value="">Select College</option>
//                       <option value="GD Goenka University">
//                         GD Goenka University
//                       </option>
//                       <option value="Manav Rachna University">
//                         Manav Rachna University
//                       </option>
//                       <option value="Gurgrgam University">
//                         Gurgrgam University
//                       </option>
//                       <option value="KR Mangalam University">
//                         KR Mangalam University
//                       </option>
//                       <option value="Sushant University">
//                         Sushant University
//                       </option>
//                       <option value="Ansal University">Ansal University</option>
//                       <option value="SGT University">SGT University</option>
//                     </select>
//                   </Form.Item>
//                 </Row>

//                 <Row className="p-1">
//                   <Form.Item label="Courses" name="course">
//                     <select name="" id="">
//                       <option value="">Select Courses</option>
//                       <option value="BCA">BCA</option>
//                       <option value="MCA">MCA</option>
//                       <option value="B.Tech">B.Tech</option>
//                       <option value="M.Tech">M.Tech</option>
//                       <option value="B.Pharma">B.Pharma</option>
//                       <option value="M.Pharma">M.Pharma</option>
//                       <option value="B.Com">B.Com</option>
//                       <option value="M.Com">M.Com</option>
//                       <option value="B.Sc">B.Sc</option>
//                       <option value="M.Sc">M.Sc</option>
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="Session" name="session">
//                     <select name="" id="">
//                       <option value="">Select Session</option>
//                       <option value="BCA">BCA</option>
//                       <option value="MCA">MCA</option>
//                       <option value="B.Tech">B.Tech</option>
//                       <option value="M.Tech">M.Tech</option>
//                       <option value="B.Pharma">B.Pharma</option>
//                       <option value="M.Pharma">M.Pharma</option>
//                       <option value="B.Com">B.Com</option>
//                       <option value="M.Com">M.Com</option>
//                       <option value="B.Sc">B.Sc</option>
//                       <option value="M.Sc">M.Sc</option>
//                     </select>
//                   </Form.Item>
//                 </Row>
//                 <Row className="p-1">
//                   <Form.Item label="Semester" name="semester">
//                     <select name="" id="">
//                       <option value="">Select Semester</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                       <option value="7">7</option>
//                       <option value="8">8</option>
//                     </select>
//                   </Form.Item>
//                 </Row>
//               </Col> 
//             </div> */}
//             <div className="flex flex-col mt-2 reg-btn gap-1">
//               <button type="submit" className="primary-contained-btn">
//                 Register
//               </button>
//               <Link to="/login">Already a Member? Login</Link>
//             </div>
//           </Form>
//         </div>  
//       </div>
//     </div>
//   );
// }

// export default Register;
