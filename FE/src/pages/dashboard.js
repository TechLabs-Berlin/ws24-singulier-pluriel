import React, { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=2") // Limit to 2 items for test
      .then((response) => {
        setData(response.data); // Set fetched data to state
        setIsLoading(false); // Update loading status
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []); // To ensure effect runs once on mount

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard Data Test</h2>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;
