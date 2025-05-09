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

 //signup 
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
            res.send({ message: "Successfully signed up",alert : true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
//api login
app.post("/login", async(req, res) => {
    console.log(req.body);
    const { email } = req.body;
    try {
        const result = await userModel.findOne({ email: email });
        

        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
              }
            console.log(dataSend)
            res.send({message : "Login is succesfel",alert: true,data: dataSend,})
        } else {
            res.send({
              message: "Email is not available, please sign up",
              alert: false,
            });
          }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
    

})    

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    console.log(datasave)
    res.send({message : "Upload successfully"})
})

// api fetching product data
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
  // res.send("data")
})

//server is running
app.listen(PORT, () => console.log("server is running at port : " + PORT));
