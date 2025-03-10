import { useEffect } from "react";
import { FaUserAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import useUserProfile from "../../hooks/useUserProfile";

const UserProfile = () => {
  const { userData, userIsLoading, error } = useUserProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (userIsLoading)
    return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  // Destructure the data if available
  const { name, email, phone_number, username } = userData || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-3xl w-full bg-white dark:bg-white dark:text-black shadow-2xl rounded-xl p-8 my-20">
        <div className="text-center mb-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white text-5xl">
            <FaUserAlt />
          </div>
          {/* Name */}
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-black">
            {username || "username"}
          </h2>
        </div>

        {/* User Details */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4 rounded-lg p-4 transition-all duration-300">
            <FaUserAlt className="text-pink-600 text-2xl" />
            <div>
              <span className="font-medium text-gray-600 dark:text-black">
                Full Name:
              </span>
              <p className="text-lg text-gray-800 dark:text-black">
                {name || "Full Name"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 rounded-lg p-4 transition-all duration-300">
            <FaEnvelope className="text-yellow-600 text-2xl" />
            <div>
              <span className="font-medium text-gray-600 dark:text-black">
                Email:
              </span>
              <p className="text-lg text-gray-800 dark:text-black">
                {email || "email"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 rounded-lg p-4 transition-all duration-300">
            <FaPhoneAlt className="text-blue-600 text-2xl" />
            <div>
              <span className="font-medium text-gray-600 dark:text-black">
                Phone:
              </span>
              <p className="text-lg text-gray-800 dark:text-black">
                {phone_number || "Phone Number"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
