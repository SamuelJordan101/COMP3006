let mongoose = require("mongoose");

let transactionSchema = new mongoose.Schema({
    Payments: [
        {_id: false, Date: String, Amount: String, Description: String}
    ],
    Balance: String,
    Month: Number,
    Year: Number
}, {versionKey: false});
let Transaction = mongoose.model("Transaction", transactionSchema);

let userSchema = new mongoose.Schema({User: String, Password: String});
let User = mongoose.model("User", userSchema)

module.exports.Transaction = Transaction;
module.exports.User = User;