import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "../src/Questions.js";
import qBank from "../src/QuestionBank.js";
import Score from "../src/Score.js";
import { Button } from "react-bootstrap";
import pokeBack from "./Images/Pokeback.jpg";
import happyPika from "./Images/happyPikachu.png";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import './styles.css';

const LandingQuizPage = () => {
  const [questionBank, setQuestionBank] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    //The line if (selectedOption === questionBank[currentQuestion].answer) checks if the option selected
    //by the user (selectedOption) is the same as the correct answer for the current question (questionBank[currentQuestion].answer).
    //The questionBank is an array that holds all the questions, and currentQuestion is the index of the current question in that array.
    if (selectedOption === questionBank[currentQuestion].answer) {
      //If the selected option is the correct answer, the function increases the score by 1 with setScore(score + 1).
      // This means the user gets a point for answering correctly.
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    //The line if (currentQuestion + 1 < questionBank.length) checks if there are more questions left in the quiz.
    // The questionBank is an array that holds all the questions, and currentQuestion is the index of the current question in that array.
    // If the index of the next question (currentQuestion + 1) is less than the length of the questionBank, it means there are more questions to be asked.
    if (currentQuestion + 1 < questionBank.length) {
      //If there are more questions, the function increases the currentQuestion index by 1 with setCurrentQuestion(currentQuestion + 1).
      //This moves the game to the next question.
      //It also clears any previously selected option by setting setSelectedOption("")
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      //If there are no more questions (i.e., the currentQuestion + 1
      //is not less than the length of the questionBank), the function sets setQuizEnd(true).
      //This indicates that the quiz has ended.
      setQuizEnd(true);
    }
  };

  return (
    <>
    <div className="d-flex flex-column align-items-center justify-content-center pokeimage">
      <h1 className="app-title"> POKE QUIZ</h1>
      {!quizEnd ? (
        <Question
          question={questionBank[currentQuestion]}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          handleFormSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <Score score={score} />
          {
            score === questionBank.length ? (
              <Button
              onClick={() => navigate(-1)}
              style={{ background: "transparent", border: "none" }}
            >
              <img src={happyPika} alt="happyPika" className="imageStyle_two" style={{borderRadius:'14%'}} />
            </Button>

            ) : (
              <Button
              onClick={() => navigate(-1)}
              style={{ background: "transparent", border: "none" }}
            >
              <img src={pokeBack} alt="pokeback" className="imageStyle_two" />
            </Button>
            )
          }
        </>
      )}
    </div>
    </>
  );
};

export default LandingQuizPage;
