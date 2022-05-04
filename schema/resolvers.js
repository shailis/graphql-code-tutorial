const { userList } = require("../FakeData");

const resolvers = {
    Query: {
        users() {
            return userList;
        }
    }
}

module.exports = { resolvers };