import React, { useState, useEffect } from "react";
import questions from "./questions.json";
import "./styles.css";

const QuizApp = () => {
  // State variables for quiz management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // State variables for tracking results
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  // Update score only when showResults changes
  useEffect(() => {
    if (showResults) {
      calculateScore();
    }
  }, [showResults]);

  // Calculate score based on user's answers
  const calculateScore = () => {
    let score = 0;
    const incorrect = [];
    const unanswered = [];
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      } else if (selectedAnswers[index] !== undefined) {
        incorrect.push(index + 1); // Store question number (index + 1)
      } else {
        unanswered.push(index + 1); // Store unanswered question number (index + 1)
      }
    });
    setIncorrectQuestions(incorrect); // Update incorrect questions list
    setUnansweredQuestions(unanswered); // Update unanswered questions list
    return score;
  };

  // Handle user's answer selection
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setAnswerSubmitted(false); // Reset answer submitted state
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswerSubmitted(false); // Reset answer submitted state
    } else {
      setShowResults(true);
    }
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswerSubmitted(false); // Reset answer submitted state
    }
  };

  // Submit user's answer for evaluation
  const checkAnswer = () => {
    setAnswerSubmitted(true);
  };

  // Prompt user confirmation on quitting
  const handleQuitQuiz = () => {
    setShowResults(true); // Directly show results without download prompt
  };

  // Display unanswered/incorrect questions after quitting
  const renderUnansweredQuestions = () => {
    const questionsToDisplay =
      unansweredQuestions.length > 0 ? unansweredQuestions : incorrectQuestions;
    return questionsToDisplay.map((questionIndex) => (
      <div key={questionIndex} className="unanswered-question">
        <p>Question {questionIndex + 1}:</p>
        <p>{questions[questionIndex - 1].text}</p>{" "}
        {/* Adjust index by -1 to match displayed question number */}
      </div>
    ));
  };

  return (
    <div className="quiz-container">
      <h1>Plane Table Questions</h1>
      {showResults ? (
        <div className="result">
          You scored {calculateScore()} out of {questions.length}.
          {renderUnansweredQuestions()}
        </div>
      ) : (
        <>
          <div className="question">{questions[currentQuestion].text}</div>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <div key={option.id} className="option">
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.id}
                    checked={selectedAnswers[currentQuestion] === option.id}
                    onChange={() =>
                      handleAnswerChange(currentQuestion, option.id)
                    }
                    disabled={answerSubmitted} // Disable radio buttons once answer is submitted
                  />
                  {option.text}
                </label>
              </div>
            ))}
          </div>
          <div className="button-group">
            {currentQuestion > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            {answerSubmitted ? (
              <button onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
              </button>
            ) : (
              <>
                <button onClick={checkAnswer}>Submit Answer</button>
                <button onClick={handleQuitQuiz}>Quit Quiz</button>
              </>
            )}
          </div>
          {answerSubmitted && (
            <div className="correct-answer">
              Correct Answer:{" "}
              {
                questions[currentQuestion].options.find(
                  (option) =>
                    option.id === questions[currentQuestion].correctAnswer
                ).text
              }
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
