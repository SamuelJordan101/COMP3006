const { Db } = require("mongodb");
let models = require("./finance-schema")

async function getTransactions(month) {
    let filter = {};
    if (month) {
        filter.Month = month;
    }
    return await models.Transaction.find(filter)
}

async function getUsers(name, password) {
    return await models.User.findOne({Name: name, Password: password});
}

async function findTransaction(month, year) {
    return await models.Transaction.findOne({Month:month, Year:year});
}

async function addNewTransaction(balance, month, year, date, amount, description) {
    return await models.Transaction.create(
        {Balance: balance, Month: month, Year: year, Payments: [{Date: date, Amount: amount, Description: description}]}
    )
}

async function addToTransaction(id, balance, date, amount, description) {
    return await models.Transaction.updateOne(
        {_id: id},
        {
            $push: {
                Payments: [{Date: date, Amount: amount, Description: description}]
            },
            $set: {
                Balance: balance
            }
        }
    )
}

async function removePayment(id, date) {
    return await models.Transaction.updateOne(
        {_id: id},
        {
            $pull: {
                Payments: {Date: date}
            }
        }
    )
}

async function removeTransaction(id) {
    return await models.Transaction.deleteOne(
        {_id: id}
    )
}

async function calculateBalances() {
    let balance = 0;
    let transactions = await getTransactions();

    for (i=0;i<transactions.length; i++) {
        for (x=0; x<transactions[i].Payments.length; x++) {
            let temp = parseInt(transactions[i].Payments[x].Amount);
            balance += temp;
        }
        await models.Transaction.updateOne(
            {_id: transactions[i]._id},
            {
                $set: {
                    Balance: balance
                }
            }
        )
    }

    return;
}

module.exports.getTransactions = getTransactions;
module.exports.getUsers = getUsers;
module.exports.findTransaction = findTransaction;
module.exports.addNewTransaction = addNewTransaction;
module.exports.addToTransaction = addToTransaction;
module.exports.removePayment = removePayment;
module.exports.removeTransaction = removeTransaction;
module.exports.calculateBalances = calculateBalances;