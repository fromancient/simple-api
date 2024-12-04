const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive data
app.post("/content", (req, res) => {
  console.log(req);
  const receivedData = req.body;

  // Define the path to the file
  const filePath = path.join(__dirname, "data.json");

  // Write the received data to a file
  fs.writeFile(filePath, JSON.stringify(receivedData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).json({ message: "Error writing to file" });
    }

    // Send a response back
    res
      .status(200)
      .json({
        message: "Data received and saved successfully",
        data: receivedData,
      });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
