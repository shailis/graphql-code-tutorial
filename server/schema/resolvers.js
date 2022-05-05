const { userList, movieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: () => {
            return userList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(userList, { id: Number(id) });
            return user;
        },

        // MOVIE RESOLVERS
        movies: () => {
            return movieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(movieList, { name });
            return movie;
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(
                movieList, 
                (movie) => 
                    movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            );
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = userList[userList.length - 1].id;
            user.id = lastId + 1;
            userList.push(user);
            return user;
        },
        updateUserName: (parent, args) => {
            const { id, name } = args.input;
            let updatedUser;
            userList.forEach((user) => {
                if(user.id === Number(id)) {
                    user.name = name;
                    updatedUser = user;
                } 
            });
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            const user = _.remove(userList, (user) => user.id === Number(id));
            return null;
        }
    }
};

module.exports = { resolvers };