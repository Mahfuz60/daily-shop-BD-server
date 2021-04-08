const express = require("express");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1qjtw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());

app.use(express.json());
// console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME)

client.connect((err) => {
  const productsCollection = client.db("superShop").collection("products");
  console.log("DataBased Connected");

  app.get("/", (req, res) => {
    res.send("Hello DB is Working Now");
  });

  app.get("/products", (req, res) => {
    productsCollection.find().toArray((err, items) => {
      res.send(items);
      console.log("dataBase Access", items);
    });
  });

  app.post("/addProduct", (req, res) => {
    const newProduct = req.body;
     console.log("added product", newProduct);
    productsCollection.insertOne(newProduct).then((result) => {
      console.log("inserted Count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  app.get('/checkOut',(req,res)=>{
    // productsCollection.find(email:)

  })
});

app.listen(port);
