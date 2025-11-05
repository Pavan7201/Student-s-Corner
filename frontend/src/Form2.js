import React, { useState } from "react";
import axios from "axios";

function Form2() {
  const [formData, setFormData] = useState({
    branch: "",
    tenth_per: "",
    twelth_per: "",
    backlog: "",
    skills: [],
    btech_per: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSkillsChange = (event) => {
    const skills = event.target.value.split(",");
    setFormData({
      ...formData,
      skills,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/predict", formData)
      .then((response) => {
        setResult(response.data.prediction);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Branch:
          <input type="text" name="branch" onChange={handleChange} />
        </label>
        <br />
        <label>
          10th Percentage:
          <input type="text" name="tenth_per" onChange={handleChange} />
        </label>
        <br />
        <label>
          12th Percentage:
          <input type="text" name="twelth_per" onChange={handleChange} />
        </label>
        <br />
        <label>
          Backlog:
          <input type="text" name="backlog" onChange={handleChange} />
        </label>
        <br />
        <label>
          Skills (comma separated):
          <input type="text" name="skills" onChange={handleSkillsChange} />
        </label>
        <br />
        <label>
          B.Tech Percentage:
          <input type="text" name="btech_per" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {result && <div>The predicted placement status is {result}</div>}
    </div>
  );
}

export default Form2;
