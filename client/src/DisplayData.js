import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

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

const CREATE_USER_MUTATION = gql`
    mutation createUser($input: createUserInput!) {
        createUser(input: $input) {
            id
            name
        }
    }
`;

const DELETE_USER_MUTATION = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            name
        }
    }
`;

function DisplayData() {
    const [movieSearch, setMovieSearch] = useState("");

    // create user state
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    // delete user state
    const [deleteUserId, setDeleteUserId] = useState(0);

    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [
        fetchMovie, 
        { data: movieSearchData, error: movieError }
    ] = useLazyQuery(QUERY_MOVIE_BY_NAME);

    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);

    if (loading) {
        return <h1>Data is loading</h1>;
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => { 
                        setName(e.target.value); 
                    }} 
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => { 
                        setUsername(e.target.value); 
                    }} 
                />
                <input 
                    type="number" 
                    placeholder="Age" 
                    onChange={(e) => { 
                        setAge(e.target.value); 
                    }} 
                />
                <input 
                    type="text" 
                    placeholder="Nationality" 
                    onChange={(e) => { 
                        setNationality(e.target.value.toUpperCase()); 
                    }} 
                />
                <button onClick={() => {
                    createUser({
                        variables: {input: {name, username, age: Number(age), nationality}}
                    });
                    refetch();
                }}>Create User</button>
            </div>
            <div>
                <input 
                    type="number" 
                    placeholder="id" 
                    onChange={(e) => {
                        setDeleteUserId(e.target.value);
                    }}
                />
                <button onClick={() => {
                    deleteUser({
                        variables: { id: Number(deleteUserId) }
                    });
                    refetch();
                }}>Delete User</button>
            </div>
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
                    fetchMovie({
                        variables: {
                            name: movieSearch
                        }
                    });
                }}>Fetch Data</button>
                <div>
                    {movieSearchData && (
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