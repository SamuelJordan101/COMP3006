let models = require("./finance-schema")

async function getTransactions() {
    return await models.Transaction.find({});
}

async function getUsers() {
    return await models.User.find({});
}

module.exports.getTransactions = getTransactions;
module.exports.getUsers = getUsers;