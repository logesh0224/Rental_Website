import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-teal-700 py-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Rentify</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 py-2 font-bold rounded-lg hover:bg-teal-600"
                to="/my-hotels"
              >
                My Rentals
              </Link>
              <Link
                className="flex items-center text-white px-3 py-2 font-bold rounded-lg hover:bg-teal-600"
                to="/"
              >
               Home
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-teal-700 px-3 py-2 font-bold rounded-lg hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
