import React from "react";
// import logo from "./logo.svg";
import "./App.css";


function App() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [memeUrl, setMemeUrl] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    const fetchMeme = async () => {
      try {
        const response = await fetch("/meme");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setMemeUrl(memeData.url);
      } catch (error) {
        setError(error.message);
      }  {
        setLoading(false);
      }
    };
    fetchMeme();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <h1>Random Picture</h1>
        {error && <p>Error: {error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && <img src={memeUrl} alt="Random" style={{ maxWidth: "100%", height: "auto" }} />}
      </header>
    </div>
  );
}

export default App;