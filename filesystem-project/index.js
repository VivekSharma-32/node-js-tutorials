const { log } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
// write file
app.get("/write-file", (req, res) => {
  fs.writeFile(
    "./public/output.txt",
    "Hello, this is a sample text file!",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing file");
      }
      res.send("File written successfully");
    }
  );
});

//read file
app.get("/read-file", (req, res) => {
  fs.readFile("./public/output.txt", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    res.setHeader("Content-Type", "text/plain");
    res.send(data);
  });
});

// Append file
app.get("/append-file", (req, res) => {
  fs.appendFile("./public/output.txt", "\nThis is an appended line.", (err) => {
    if (err) {
      console.error("Error appending file:", err);
      return res.status(500).send("Error appending file");
    }
    res.send("File appended successfully");
  });
});

// Delete File
app.get("/delete-file", (req, res) => {
  fs.unlink("./public/output.txt", (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).send("Error: Failed to delete file");
    }
    res.send("File deleted successfully");
  });
});

// Read Folder
app.get("/read-folder", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).send("Error reading folder");
    }

    files.forEach((file) => {
      console.log(file);
    });

    res.json(files);
  });
});

// Rename file
app.get("/rename-file", (req, res) => {
  fs.rename("./public/output.txt", "./public/renamed-output.txt", (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      return res.status(500).send("Error renaming file");
    }
    res.send("File renamed successfully");
  });
});

// Stream Data
app.get("/stream-file", (req, res) => {
  const fileStream = fs.createReadStream("./public/renamed-output.txt");
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });

  fileStream.on("error", () => {
    return res.status(500).send("Error reading file");
  });
});

// Create Folder
app.get("/create-folder", (req, res) => {
  fs.mkdir("./public/vivek", (err) => {
    if (err) {
      console.error("Error creating folder:", err);
      return res.status(500).send("Error creating folder");
    }
    res.send("Folder created successfully");
  });
});

// Rename Folder
app.get("/rename-folder", (req, res) => {
  fs.rename("./public/vivek", "./public/vivek-renamed", (err) => {
    if (err) {
      console.error("Error renaming folder:", err);
      return res.status(500).send("Error renaming folder");
    }
    res.send("Folder renamed successfully");
  });
});

// Delete Folder
app.get("/delete-folder", (req, res) => {
  fs.rmdir("./public/vivek-renamed", (err) => {
    if (err) {
      console.error("Error deleting folder:", err);
      return res.status(500).send("Error deleting folder");
    }
    res.send("Folder deleted successfully");
  });
});

// Read pdf file
app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/data.pdf", (err, data) => {
    if (err) {
      console.error("Error reading PDF file:", err);
      return res.status(500).send("Error reading PDF file");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
});

// Read json file

app.get("/read-json", (req, res) => {
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      console.error("Error reading  JSON file:", err);
      return res.status(500).send("Error reading JSON file");
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

// write json
app.get("/write-json", (req, res) => {
  const jsonData = {
    name: "John Doe",
    age: 30,
    city: "New York",
  };
  fs.writeFile("./public/data.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return res.status(500).send("Error writing JSON file");
    }
    res.send("JSON file written successfully");
  });
});

// append json
app.get("/append-json", (req, res) => {
  const newData = {
    name: "Vikram Singh",
    age: 30,
    city: "Delhi",
  };
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Error reading JSON file");
    }
    let jsonData;
    jsonData = JSON.parse(data);
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }
    jsonData.push(newData);
    fs.writeFile("./public/data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return res.status(500).send("Error writing JSON file");
      }
      res.send("JSON file appended successfully");
    });
  });
});

// read image
app.get("/read-image", (req, res) => {
  fs.readFile("./public/image.jpg", (err, data) => {
    if (err) {
      console.error("Error reading image file:", err);
      return res.status(500).send("Error reading image file");
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.send(data);
  });
});

// read video
app.get("/read-video", (req, res) => {
  fs.readFile("./public/video.mp4", (err, data) => {
    if (err) {
      console.error("Error reading video file:", err);
      return res.status(500).send("Error reading video file");
    }
    res.setHeader("Content-Type", "video/mp4");
    res.send(data);
  });
});

// file information command
app.get("/file-info", (req, res) => {
  fs.stat("./public/data.json", (err, stats) => {
    if (err) {
      console.error("Error getting file info:", err);
      return res.status(500).send("Error getting file info");
    }
    console.log("File: ", stats.isFile());
    console.log("Folder: ", stats.isDirectory());
    res.json(stats);
  });
});

//check if file exists
app.get("/check-file", (req, res) => {
  fs.access("./public/data.json", (err) => {
    if (err) {
      return res.status(500).send("File does not exist");
    }
    res.send("File Exists");
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
