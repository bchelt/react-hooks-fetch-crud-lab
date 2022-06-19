import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, deleteQuestion, patchQuestion }) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => 
        <QuestionItem key={question.id} question={question} deleteQuestion={deleteQuestion} patchQuestion={patchQuestion}/>
      )}</ul>
    </section>
  );
}

export default QuestionList;
