import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  function handleAddQuestion(question) {
    question.id = questions.length + 1;
    setQuestions([...questions, question]);
  }

  function handleDelete(id) {
    const newQuestionList = questions.filter((item) => item.id !== id)
    setQuestions(newQuestionList);
  }

  function handlePatch(updatedQuestion, value) {
    const newQuestionList = questions.map((question) => {
      if(question.id === updatedQuestion.id) {
        return {...updatedQuestion, "correctIndex": value}
      }
      else {
        return question;
      }
    })
    setQuestions(newQuestionList);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={handleAddQuestion}/> : <QuestionList questions={questions} deleteQuestion={handleDelete} patchQuestion={handlePatch}/>}
    </main>
  );
}

export default App;
