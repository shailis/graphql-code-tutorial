import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query getAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            name
        }
    }
`;

const QUERY_MOVIE_BY_NAME = gql`
    query movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

function DisplayData() {
    const [movieSearch, setMovieSearch] = useState("");

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchData, error: movieError }] = useLazyQuery(QUERY_MOVIE_BY_NAME);

    if (loading) {
        return <h1>Data is loading</h1>;
    }

    if (error) {
        console.log(error);
    }

    if(movieError) {
        console.log(movieError);
    }

    return (
        <div>
            {data && data.users.map((user) => {
                return (
                    <div>
                        <h1>Name: {user.name}</h1>
                        <h1>Username: {user.username}</h1>
                        <h1>Age: {user.age}</h1>
                        <h1>Nationality: {user.nationality}</h1>
                    </div>
                );
            })}

            {movieData && movieData.movies.map((movie) => {
                return <h1>Movie Name: {movie.name}</h1>;
            })}

            <div>
                <input type="text" placeholder="Interstellar" onChange={(e) => setMovieSearch(e.target.value)} />
                <button onClick={() => {
                    fetchMovie({variables: {
                        name: movieSearch
                    }});
                }}>Fetch Data</button>
                <div>
                    { movieSearchData && (
                        <div>
                            <h1>Movie Name: {movieSearchData.movie.name}</h1>
                            <h1>Year of Publication: {movieSearchData.movie.yearOfPublication}</h1>
                        </div>
                    )}
                    {movieError && <h1>There was an error in fetching the movie</h1>}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;