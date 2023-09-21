import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../axios';
import requests from '../request';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchRomanceMovies);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const opts = {
        height: "800px",
        width: "800px",
        playerVars: {
            autoplay: 1,
        },
    };

    const closeVideo = () => {
        setTrailerUrl("");
        setFullScreen(false);
    };

    const playClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
            setFullScreen(false);
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    setFullScreen(true);
                })
                .catch((error) => console.log(error));
        }
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <div>
            {fullScreen ? (
                <div className="fullscreen-video">
                    <button onClick={closeVideo}>X</button>
                    {trailerUrl && (
                        <YouTube videoId={trailerUrl} opts={{ ...opts, height: '1000px', width: '1000px' }} />
                    )}
                </div>
            ) : (
                <header
                    className="banner"
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="banner__contents">
                        <h1 className="banner__title">
                            {movie?.title || movie?.name || movie?.original_name}
                        </h1>
                        <div className="banner__buttons">
                            <button className="banner__button" onClick={() => playClick(movie)}>
                                Play
                            </button>
                            {!showDescription && (
                                <button
                                    className="banner__button"
                                    onClick={() => setShowDescription(true)}
                                >
                                    More Information
                                </button>
                            )}
                        </div>
                        {showDescription && (
                            <h1 className="banner__description">{truncate(movie?.overview, 250)}</h1>
                        )}
                    </div>
                </header>
            )}
        </div>
    );
};

export default Banner;
