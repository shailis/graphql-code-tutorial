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
            return _.filter(movieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    }
};

module.exports = { resolvers };