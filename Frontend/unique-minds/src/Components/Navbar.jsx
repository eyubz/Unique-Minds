import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import img from "../Assets/image1_0.jpg";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-customBlue text-lg font-bold">
          <img src={logo} alt="UniqueMinds" className="w-20 h-10" />
        </Link>
        <div className="flex items-center">
          <Link to="/courses" className="text-customBlue mr-4">
            Courses
          </Link>
          <Link to="/educators" className="text-customBlue mr-4">
            Educators
          </Link>
          <Link to="/about" className="text-customBlue mr-4">
            About Us
          </Link>
          <Link to="/contact" className="text-customBlue mr-4">
            Contact Us
          </Link>
          <Link to="/login" className="text-customBlue mr-4">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-customBlue text-white px-4 py-2 rounded mr-4"
          >
            Signup
          </Link>
          <Link to="/student_dashboard">
            <div className="flex items-center">
              <img
                //src={profileImage ? profileImage : img}
                src={img}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
