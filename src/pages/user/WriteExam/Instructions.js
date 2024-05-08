import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, view, setView }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl underline">INSTRUCTIONS</h1>
      <ul className="flex flex-col gap-2">
        <li>Exam must be completed within the {examData.duration} mins</li>
        <li>
          Exam will be automatically submitted successfully after{" "}
          {examData.duration} mins
        </li>
        <li>Once submitted you cannot chagne your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold">Previous </span> and
          <span className="font-bold"> Next </span>buttons to navigate between
          questions.
        </li>
        <li>
          Total Marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>
        </li>
        <li>
          Passing Marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>
        </li>
      </ul>
      <div className="flex gap-2 mt-2">
        <button className="primary-outlined-btn" onClick={() => navigate("/")}>
          CLOSE
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => setView("questions")}
        >
          START EXAM
        </button>
      </div>
    </div>
  );
}

export default Instructions;
