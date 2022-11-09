import './App.css';
import Layout from './components/layout/Layout';

import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

import '../node_modules/venobox/dist/venobox.min.css';
import Homepage from './pages/homepage';
import BlogPage from './pages/blogpage';

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Login from './pages/loginpage';
import Registration from './pages/registrationpage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Categories from './pages/blogCategoriesPage';
import BlogCategories from './pages/blogCategoriesPage';
import BlogDetails from './pages/blogDetails';
import Dashboard from './pages/dashboard';
import AddBlog from './pages/addblog';
import Profile from './pages/proflle';

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  if (!user) {
    return children;
  } else {
    return <Navigate to={location?.state?.from || '/'} />;
  }
};

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/blog"
            element={
              <AuthRequired>
                <BlogPage />
              </AuthRequired>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <AuthRequired>
                <BlogCategories />
              </AuthRequired>
            }
          />
          <Route
            path="/blogDetails/:id"
            element={
              <AuthRequired>
                <BlogDetails />
              </AuthRequired>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRequired>
                <Dashboard />
              </AuthRequired>
            }
          />
          <Route
            path="/addBlog"
            element={
              <AuthRequired>
                <AddBlog />
              </AuthRequired>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRequired>
                <Profile />
              </AuthRequired>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
