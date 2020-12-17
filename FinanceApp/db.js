const { filter } = require("async");
let models = require("./finance-schema")

async function getTransactions(month) {
    let filter = {};
    if (month) {
        filter.Month = month;
    }
    return await models.Transaction.find(filter)
}

async function getUsers() {
    return await models.User.find({});
}

module.exports.getTransactions = getTransactions;
module.exports.getUsers = getUsers;