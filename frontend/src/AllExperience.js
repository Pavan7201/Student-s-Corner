import React, { useState, useEffect } from 'react';

function AllExperience(props) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.searchTerm) {
      fetch(`/api/questions?tags=${props.searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setQuestions(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setQuestions([]);
      setLoading(false);
    }
  }, [props.searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>

      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllExperience;
