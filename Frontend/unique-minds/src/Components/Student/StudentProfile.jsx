import Navbar from "../Navbar";
import SideBar from "./Student_profile/Sidebar";

const StudentProfile = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100 w-full">
        <SideBar />
      </div>
    </>
  );
};

export default StudentProfile;
