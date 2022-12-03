import express from "express";
import morgan from "morgan";
import cors from "cors"
import routes from "./routes/route/index.js";
import db from "./config/db/index.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

const app = express();

//CONNECT DB MONGO
db.connect();

const port = 8000;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors({
  origin: true
}))


app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({
  extended: true
}))

//ROUTES
routes(app);

// SET HEADERS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.listen(port, () => {
  console.log("LISTENING SUCCESSFUL");
});