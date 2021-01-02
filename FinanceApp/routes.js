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
    let minutes = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let hours = (d.getHours()<10?'0':'') + d.getHours();
    let currentDate = day + "-" + month + "-" + d.getFullYear() + " " + hours + ":" + minutes;

    let test = await db.findTransaction(month, year);

    let amount = (request.body.amount * -1).toFixed(2);

    if(test == null) {
        await db.addNewTransaction(balance, month, year, currentDate, amount, request.body.description);
    } else {
        await db.addToTransaction(id, balance, currentDate, amount, request.body.description)
    }

    response.redirect("/Home");
}

module.exports.listAllTransactions = listAllTransactions;
module.exports.pageListTransactions = pageListTransactions;
module.exports.loadLogin = loadLogin;
module.exports.findUser = findUser;
module.exports.addPayment = addPayment;
