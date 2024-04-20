import React from "react";

const Questions = ({
  question,
  selectedOption,
  handleOptionChange,
  handleFormSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2>{question.question}</h2>
        {question.options.map((option, index) => (
          <div key={index}>
            <label className="mt-2">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mt-3"
            />
            {option}
            </label>
          </div>
        ))}
        <button type="submit" className="mt-4">Next</button>
      </form>
    </>
  );
};

export default Questions;
