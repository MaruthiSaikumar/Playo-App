const express = require("express");
const colors = require("colors");
const path = require("path");
const dotenv = require("dotenv").config();
const { errHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5000;
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errHandler);

app.listen(port, () =>
  console.log(`Server started on Port ${process.env.port}`)
);
