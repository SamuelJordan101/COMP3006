let db = require("./db");

async function listAllTransactions(request, response) {
    let transactions = await db.getTransactions({});
    response.setHeader("content-type", "text/json");
    response.send({"Transactions": transactions});
}

async function pageListTransactions(request, response) {
    let transaction = await db.getTransactions(request.body.month, request.body.year);
    response.render("Finance", {"Transactions": transaction});
}

module.exports.listAllTransactions = listAllTransactions;
module.exports.pageListTransactions = pageListTransactions;