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

module.exports.listAllTransactions = listAllTransactions;
module.exports.pageListTransactions = pageListTransactions;
module.exports.loadLogin = loadLogin;
module.exports.findUser = findUser;
