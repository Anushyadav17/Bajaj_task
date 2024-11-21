import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filteredData, setFilteredData] = useState("Numbers");
  const [loading, setLoading] = useState(false);

  // Handle JSON Input
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setError("");
  };

  // Validate and Submit JSON
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const parsedJson = JSON.parse(jsonInput); // Validate JSON
      if (!parsedJson || !Array.isArray(parsedJson.data)) {
        setError("Invalid JSON. Ensure 'data' is an array.");
        return;
      }
      // Call API
      const response = await axios.post("https://bajaj-backend-2-cboo.onrender.com/bfhl", parsedJson);
      console.log(response);
      setResponseData(response.data);
      setFilteredData(null);
      setLoading(false);
    } catch (err) {
      setError("Invalid JSON or server error.");
      setLoading(false);
    }
  };

  // Filter Response Based on Dropdown Selection
  const handleDropdownChange = (selectedOptions) => {
    const selectedData = {};
    if (selectedOptions.includes("Alphabets")) {
      selectedData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      selectedData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      selectedData.highestLowercaseAlphabet = responseData.highest_lowercase_alphabet;
    }
    setFilteredData(selectedData);
  };

  return (
    <div>
      {/* Set Dynamic Page Title */}
      <title>ABCD123</title>

      <h1>Frontend for Backend API</h1>

      {/* JSON Input Field */}
      <textarea
        rows="6"
        cols="50"
        placeholder='Enter JSON (e.g., { "data": ["A", "B", "z"] })'
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {
        loading ? (<p style={{ fontSize: "50px" }}>loading........</p>) : (<p></p>)
      }

      {/* Dropdown and Response Rendering */}
      {responseData && (
        <div>
          <h2>Response Options</h2>
          <select
            multiple
            onChange={(e) =>
              handleDropdownChange([...e.target.options].filter((opt) => opt.selected).map((opt) => opt.value))
            }
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div>
            <h2>Filtered Response</h2>
            <pre>{JSON.stringify(filteredData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
