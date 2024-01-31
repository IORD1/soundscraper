const express = require('express');
const cors = require('cors');
const { dlAudio } = require("youtube-exec");
const fs = require('fs');
const ytdl = require('ytdl-core');

const app = express();
app.use(express.json());
app.use(cors());


async function downloadAudio(url, name) {
  try {
    const downloadPath = "/home/iord/downloads"; // Replace with your download directory

    // Use dlAudio for simplicity:
    await dlAudio({
      url: url,
      quality: "lowest", // Adjust quality as needed
      output: `${downloadPath}/${name}.mp3`,
    });

    console.log("Audio downloaded successfully!");

  } catch (err) {
    console.error("Error downloading audio:", err);
  }
}






// app.post('/downloadit', async (req, res) => {
//   console.log("-------------Fetching----------");
//   console.log(req.body);

//   // const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
//   // const name = "secondRickRoll";
//   downloadAudio(req.body.url, req.body.name);
//   const response = { "name": "bozz" };
//   res.send(JSON.stringify(response));
// })


app.post('/downloadit', async (req, res) => {
  console.log("-------------Fetching----------");
  console.log(req.body);

  try {
    await downloadAudio(req.body.url, req.body.name);
    console.log("Download complete!");

    const response = { 
      name: req.body.name,
      downloadComplete: true, 
    };
    res.json(response);
  } catch (error) {
    console.error("Error during download:", error);

    const response = {
      name: req.body.name,
      downloadComplete: false, 
    };
    res.status(500).json(response);
  }
});

app.get('/hi', (req, res)=>{

  console.log("Hi called")
  const response = { "name": "bozz" };
  
  res.send(JSON.stringify(response));
}) 


app.listen(3001, () => {
  console.log("Server started on port 3001");
})