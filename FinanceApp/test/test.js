let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../FinanceServer");
let db = require("../db");
let mongoose = require("mongoose");

chai.use(chaiHttp);

suite("Test routes", function () {

    test("Test home", function() {
        let url = "http://localhost:9000/Home";

        chai.request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    })

    test("Test login", function() {
        let url = "http://localhost:9000/Login";

        chai.request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        })
    })
})

suite("Test database connection", function () {
    test("Database connection",function() {
        mongoose.connect("mongodb+srv://Sam:DJTuned101@cluster.pnaly.mongodb.net/FinanceApp?retryWrites=true&w=majority");
    })
})
