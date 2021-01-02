let db = require("./db");

async function listAllTransactions(request, response) {
    let transactions = await db.getTransactions();
    response.setHeader("content-type", "text/json");
    response.send({"Transactions": transactions});
}

async function pageListTransactions(request, response) {
    let transaction = await db.getTransactions(request.body.month);
    let allTransaction = await db.getTransactions();
    response.render("Finance", {"Transactions": transaction, "allTransactions": allTransaction});
}

async function loadLogin(request, response) {
    response.render("Login", {"Correct": true});
}

async function findUser(request, response) {
    let username = (request.body.username).toLowerCase();
    let users = await db.getUsers(username, request.body.password);
    if (users) {
        response.redirect("/Home");
    } else {
        response.render("Login", {"Correct": false});
    }
}

async function addPayment(request, response) {
    let transaction = await db.getTransactions();
    let balance = transaction[transaction.length-1].Balance;
    let id = transaction[transaction.length-1]._id;

    if(request.body.amount != undefined) {
        balance = balance - request.body.amount;
    }

    let d = new Date();
    let day = (d.getDate() < 10 ? '0' : '') + d.getDate();
    let month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    let year = d.getFullYear();
    let currentDate = day + "-" + month + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();

    let test = await db.findTransaction(month, year);

    if(test == null) {
        await db.addNewTransaction(balance, month, year, currentDate, request.body.amount * -1, request.body.description);
    } else {
        await db.addToTransaction(id, balance, currentDate, request.body.amount * -1, request.body.description)
    }

    transaction = await db.getTransactions();
    let allTransaction = await db.getTransactions();

    response.render("Finance", {"Transactions": transaction, "allTransactions": allTransaction});
}

module.exports.listAllTransactions = listAllTransactions;
module.exports.pageListTransactions = pageListTransactions;
module.exports.loadLogin = loadLogin;
module.exports.findUser = findUser;
module.exports.addPayment = addPayment;
