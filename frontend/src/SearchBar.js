import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/questions?tags=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {results.map((question) => (
        <div key={question._id}>
          <h3>{question.title}</h3>
          <p>{question.body}</p>
          <p>Tags: {question.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
