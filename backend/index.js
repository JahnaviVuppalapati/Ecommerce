const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  })

//model
const userModel = mongoose.model("user", userSchema);
//api
app.get("/", (req, res) => {
    res.send("Server is running");
  })
  app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
        const result = await userModel.findOne({ email: email });
        console.log(result);

        if (result) {
            res.send({ message: "Email id is already registered", alert: false });
        } else {
            const data = new userModel(req.body); // Ensure req.body is correctly formatted
            await data.save();
            res.send({ message: "Successfully signed up" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


app.listen(PORT, () => console.log("server is running at port : " + PORT));
