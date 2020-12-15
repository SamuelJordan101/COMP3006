let mongoose = require("mongoose");

let transactionSchema = new mongoose.Schema({
    Transaction: [
        {Date: String, Amount: String, Description: String}
    ],
    Balance: String,
    Month: String,
    Year: String
});
let Transaction = mongoose.model("Transaction", transactionSchema);

let userSchema = new mongoose.Schema({User: String, Password: String});
let User = mongoose.model("User", userSchema)

module.exports.Transaction = Transaction;
module.exports.User = User;