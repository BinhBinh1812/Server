const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

dotenv.config();
const PORT = 8000;
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
	console.log("Connected to Mongo DB!");
});

app.use(express.json());
app.use(cors());

//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/conversation", conversationRoute);
app.use("/v1/message", messageRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
