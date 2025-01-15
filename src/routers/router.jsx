import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import HomePage from '../pages/HomePage/HomePage';
import MainLayout from '../pages/MainLayout/MainLayout';
import Travel from '../pages/Travel/Travel';
import Contact from '../pages/Contact/Contact';
import Hotel from '../pages/Hotel/Hotel';
import SignUp from '../pages/SignUp/SignUp';
import ForgetPassWord from '../pages/ForgetPassWord/ForgetPassWord';
import TravelDetail from '../pages/TravelDetail/TravelDetail';
import HotelDetail from '../pages/HotelDetail/HotelDetail';


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    exact: true
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true
  },
  {
    path: "/signup",
    element: <ForgetPassWord />,
    exact: true
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "travel", element: <Travel /> },
      { path: "hotel", element: <Hotel /> },
      { path: "contact", element: <Contact /> },
      { path: "travel/travel_detail/:id", element: <TravelDetail /> },
      { path: "hotel/hotel_details/:id", element: <HotelDetail /> },

    ]
  },
]);