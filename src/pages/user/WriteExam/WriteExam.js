import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
// import { getExamById } from "../../../apicalls/exams";
import { addReport } from "../../../apicalls/reports";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useParams } from "react-router-dom";
import Instructions from "./Instructions";
import { useNavigate } from "react-router-dom";
import { getSingleCourseById } from "../../../apicalls/courses";

function WriteExam() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const [view, setView] = useState("instructions");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState({});
  const { user } = useSelector((state) => state.users);

  const getCourseData = async () => {
    try {
      // console.log(user);
      dispatch(ShowLoading());
      const response = await getSingleCourseById({ courseId: params.id });
      dispatch(HideLoading());
      if (response.success) {
        // message.success(response.message);
        setQuestions(response.data.questions);
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];
      // console.log(questions);
      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }
      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      dispatch(ShowLoading());
      const response = await addReport({
        course: params.id,
        result: tempResult,
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setView("result");
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCourseData();
    // eslint-disable-next-line
  }, []);

  return (
    examData && (
      <>
        <div className="text-center text-md">
          <PageTitle title={examData.name.toUpperCase()} />
          <div className="divider"></div>
        </div>
        {view === "instructions" && (
          <Instructions examData={examData} view={view} setView={setView} />
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2 pl-5">
            <h1 className="text-xl">
              {selectedQuestionIndex + 1} :{" "}
              {questions[selectedQuestionIndex].name}
            </h1>
            <div className="flex flex-col gap-1">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex flex-col gap-2 ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option,
                        });
                      }}
                    >
                      <span className="text-lg">
                        {option} :{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    calculateResult();
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex justify-center mt-2 gap-1 p-1 card">
            {result.verdict === "Pass" && (
              <dotlottie-player
                src="https://lottie.host/ed4fc1f9-d4e2-4f8d-9b08-65e4a863d720/36z4hp4FLC.json"
                background="transparent"
                speed="1"
                style={{ width: "200px", height: "200px" }}
                loop
                autoplay
              ></dotlottie-player>
            )}
            {result.verdict === "Fail" && (
              <dotlottie-player
                src="https://lottie.host/73c5f26e-2107-4a5b-b8fb-cf51539cc257/lKFuP7Bf5P.json"
                background="transparent"
                speed="1"
                style={{ width: "200px", height: "200px" }}
                loop
                autoplay
              ></dotlottie-player>
            )}
            <div className="p-1 result">
              <h1 className="text-xl">RESULT</h1>
              <div className="marks">
                <h1 className="text-md">Total Marks : {examData.totalMarks}</h1>
                <h1 className="text-md">
                  Passing Marks : {examData.passingMarks}
                </h1>
                <h1 className="text-md">
                  Obtained Marks : {result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  Wrong Answers : {result.wrongAnswers.length}
                </h1>
                <h1 className="text-md">
                  Result :{" "}
                  <span
                    className={`${result.verdict === "Pass" ? "pass" : "fail"}`}
                  >
                    {result.verdict}
                  </span>
                </h1>

                <div className="flex gap-1 justify-between mt-1">
                  <button
                    className="primary-outlined-btn w-100"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                    }}
                  >
                    Retake
                  </button>
                  <button
                    className="primary-outlined-btn w-100"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
            {result.verdict === "Pass" && (
              <dotlottie-player
                src="https://lottie.host/eb0ca07f-8046-46ec-96f6-f1dc9d796c6f/LXOTx6Tz1f.json"
                background="transparent"
                speed="1"
                style={{ width: "200px", height: "200px" }}
                loop
                autoplay
              ></dotlottie-player>
            )}
            {result.verdict === "Fail" && (
              <dotlottie-player
                src="https://lottie.host/21c45dcc-d89b-4e26-933d-395ddc286853/CHGSNSITVw.json"
                background="transparent"
                speed="1"
                style={{ width: "200px", height: "200px" }}
                loop
                autoplay
              ></dotlottie-player>
            )}
          </div>
        )}

        {view === "review" && (
          <div>
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                height: "365px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "8px",
              }}
            >
              <div className="flex flex-col gap-1">
                {questions.map((question, index) => {
                  const isCorrect =
                    question.correctOption === selectedOptions[index];
                  return (
                    <div
                      className={`flex flex-col gap-1 p-2 card ${
                        isCorrect ? "bg-success" : "bg-info"
                      }`}
                    >
                      <span className="text-lg">
                        {index + 1} : {question.name}
                        <b></b>
                      </span>
                      <span className="text-md">
                        Submitted Answer : {selectedOptions[index]} ={" "}
                        {question.options[selectedOptions[index]]}
                      </span>
                      <span className="text-md">
                        Correct Answer : {question.correctOption} ={" "}
                        {question.options[question.correctOption]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-1 justify-center mt-1">
              <button
                className="primary-outlined-btn "
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </button>
              <button
                className="primary-contained-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                }}
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default WriteExam;
