import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import HomePage from '../pages/HomePage/HomePage';
import MainLayout from '../pages/MainLayout/MainLayout';
import Contact from '../pages/Contact/Contact';
import Hotel from '../pages/Hotel/Hotel';
import SignUp from '../pages/SignUp/SignUp';
import ForgetPassWord from '../pages/ForgetPassWord/ForgetPassWord';
import HotelDetail from '../pages/HotelDetail/HotelDetail';
import TourTravel from '../pages/TourTravel/TourTravel';
import TourDetails from '../pages/TourDetails/TourDetails';
import Specialities from '../pages/Specialities/Specialities';
import TravelTip from '../pages/TravelTip/TravelTip';
import TravelTipDetails from '../pages/TravelTipDetails/TravelTipDetails';
import SpecialitiesDetails from '../pages/SpecialitiesDetails/SpecialitiesDetails';


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
    path: "/forget_password",
    element: <ForgetPassWord />,
    exact: true
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "tour", element: <TourTravel /> },
      { path: "hotel", element: <Hotel /> },
      { path: "contact", element: <Contact /> },
      { path: "tour/tour_details/:id", element: <TourDetails /> },
      { path: "hotel/hotel_details/:id", element: <HotelDetail /> },
      { path: "travelTip", element: <TravelTip /> },
      { path: "travelTip/:id", element: <TravelTipDetails /> },
      { path: "specialities", element: <Specialities /> },
      { path: "specialities/:id", element: <SpecialitiesDetails /> },
    ]
  },
]);