

// Import styles for ag grid
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
// Import styles for owl carousel
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/accordion.css';
import "./assets/home.css";
import DefaultLayout from './components/layout/DefaultLayout';
import Login from './pages/Login';
import VerifyPassword from './pages/VerifyPassword';
import { SHOW_SCROLL } from './redux/contants/action-type';
import routes from './routes';
// Import styles for fontawesome
import '/node_modules/@fortawesome/fontawesome-svg-core/styles.css';

function App() {
  const dispatch = useDispatch();  
    useEffect(() => {
        window.addEventListener("scroll", () => {
          const height = window.innerHeight;
            if (window.scrollY > height) {
                dispatch({
                  type: SHOW_SCROLL,
                  payload: true
                })
            } else {
              dispatch({
                type: SHOW_SCROLL,
                payload: false
              })
            }
        });
    }, []);

  return (
    <Routes>
      <Route exact path="/login" name="Login Page" element={<Login /> } />
      <Route path="/verify-password" name="Verify Password Page" element={<VerifyPassword /> } />
      <Route element={<DefaultLayout />}>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                // exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          )
        })}
        <Route path="" element={<Navigate to="login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
