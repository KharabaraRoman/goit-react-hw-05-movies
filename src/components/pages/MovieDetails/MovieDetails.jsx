import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMovieDetails,  } from 'components/services/TmbdApi';
import Loader from 'components/Loader/Loader';
import {
  Container,
  List,
  ListInfo,
  LinkInfo,
  Button,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get('query');

  useEffect(() => {
    if (!queryParams) {
      return;
    }

    getMovieByQuery(queryParams)
      .then(({ results }) => {
        if (!results.length) {
          const error = new Error(`No result containing ${queryParams} were found`);
          throw error;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [queryParams]);

  useEffect(() => {
    const fetchMovieDetailsFilms = () => {
      setLoading(true);

      fetchMovieDetails(movieId)
        .then(detailMovie => {
          setMovieInfo(detailMovie);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMovieDetailsFilms();
  }, [movieId]);

  if (!movieInfo) {
    return null;
  }

  const {
    title,
    release_date,
    popularity,
    overview,
    genres,
    poster_path,
    original_title,
  } = movieInfo;

  return (
    <>
      <Link to={location.state?.from ?? '/'}>
        <Button type="button">Go back</Button>
      </Link>
      {loading && <Loader />}
      <Container>
        <img
          width="300px"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
          }
          alt={original_title}
        />
        <div>
          <h1>
            {title} ({release_date.slice(0, 4)})
          </h1>
          <p>User score: {popularity}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <List>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </List>
        </div>
      </Container>
      <hr />
      <div>
        <h3>Additional information</h3>
        <ListInfo>
          <li>
            <LinkInfo to="cast">Cast</LinkInfo>
          </li>
          <li>
            <LinkInfo to="reviews">Reviews</LinkInfo>
          </li>
        </ListInfo>
        <hr />
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;