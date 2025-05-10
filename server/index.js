// server/index.js

const express = require("express");
const path = require('path');


const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  //console.log(`Request received at ${new Date().toISOString()} from ${req.ip}`);
  res.json({ message: "Hello from server!" });
});

app.get("/meme", (req, res) => {
  //console.log(`Request received at ${new Date().toISOString()} from ${req.ip}`);
  res.endpoint("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
      res.end(randomMeme.url);
    })
    .catch((error) => {
      console.error("Error fetching meme:", error);
      res.status(500).json({ error: "Failed to fetch meme" });
    });
});
// All other GET requests not handled before will return our React 


app.get('/{*any}', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'fallback.html'));
});



const PORT = process.env.PORT || 3001;




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});