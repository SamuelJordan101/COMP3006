let mongoose = require("mongoose");
let port = process.env.port || 9000;
let express = require("express");
let app = express();
let path = require("path");
let routes = require("./routes");

let url = "mongodb+srv://Sam:DJTuned101@cluster.pnaly.mongodb.net/FinanceApp?retryWrites=true&w=majority";
//let url = "mongodb://localhost:27017/financeapp";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

app.use(express.static(path.join(__dirname, "statics")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.get("/Transactions", routes.listAllTransactions);
app.get("/Users", routes.listAllUsers);
app.get("/Home", routes.pageListTransactions);
app.post("/filtermonth", routes.pageListTransactions);

app.listen(port, function() {
    console.log("Listening on " + port);
})