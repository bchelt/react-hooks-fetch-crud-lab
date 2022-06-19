import React from "react";

function QuestionItem({ question, deleteQuestion, patchQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => deleteQuestion(id))
    ;
  }
  
  function handleChangeAnswer(event) {
    console.log(event.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"correctIndex": parseInt(event.target.value)})
    })
    .then(res => res.json())
    .then(() => patchQuestion(question, event.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeAnswer} >{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
