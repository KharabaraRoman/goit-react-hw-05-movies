import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';



const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));
const Home = lazy(() => import('../components/pages/Home/Home'));
const MovieDetails = lazy(() => import('../components/pages/MovieDetails/MovieDetails'));
const Movies = lazy(() => import('../components/pages/Movies/Movies'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Route>
    </Routes>
  );
};

export default App;