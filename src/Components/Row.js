import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "800px",
        width: "1000px",
        playerVars: {
            autoplay: 1,
        },
    };

    const closeVideo = () => {
        setTrailerUrl("");
        setModal(false);
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
            setModal(false);
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    setModal(true);
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {modal && (
                <div className="fullscreen-video">
                    <button onClick={closeVideo}>X</button>
                    {trailerUrl && (
                        <YouTube videoId={trailerUrl} opts={opts} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Row;
