let mongoose = require("mongoose");
let port = process.env.PORT || 9000;
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

app.post("/findUser", routes.findUser);
app.get("/Login", routes.loadLogin);
app.get("/Home", routes.pageListTransactions);
app.post("/filtermonth", routes.pageListTransactions);
app.post("/addpayment", routes.addPayment);
app.post("/removePayment", routes.removePayment);


app.listen(port, function() {
    console.log("Listening on " + port);
})