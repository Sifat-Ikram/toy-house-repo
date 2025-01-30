import {
  FaUserEdit,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPencilAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const profile = {
    _id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    avatar: "https://i.ibb.co/47Vhpmc/user-avatar.png", // Replace with a proper avatar URL
  };

  const address = {
    street: "123 Toy Lane",
    city: "Toyville",
    state: "Toyland",
    zip: "56789",
    country: "Toy Country",
  };

  const payment = {
    cardNumber: "**** **** **** 1234",
    expiry: "12/25",
    cardHolderName: "John Doe",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome, {profile.name}!
      </h1>

      {/* Profile Section */}
      <div className="relative flex flex-col sm:flex-row sm:justify-center sm:gap-10 md:gap-20 lg:gap-32">
        {/* User Image */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatar}
            alt={`Avatar of ${profile.name}`}
            className="w-40 h-40 rounded-full object-cover border-4 shadow-md"
          />
        </div>

        {/* Profile Information */}
        <div className="">
          <div className="absolute top-0 right-0">
            <Link to={`/dashboard/updateProfile/${profile._id}`}>
              <button className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
                <FaPencilAlt className="text-xl" />
              </button>
            </Link>
          </div>

          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
            <FaUserEdit /> Profile Information
          </h2>
          <dl className="space-y-2">
            <div className="flex gap-2">
              <dt className="font-medium text-gray-600">Name:</dt>
              <dd>{profile.name || "Not available"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-600">Email:</dt>
              <dd>{profile.email || "Not available"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-600">Phone:</dt>
              <dd>{profile.phone || "Not available"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-600">Date of Birth:</dt>
              <dd>{profile.dateOfBirth || "Not available"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
          <FaMapMarkerAlt /> Address Details
        </h2>
        <dl className="flex justify-start gap-14 sm:gap-10 md:gap-14 lg:gap-20 flex-wrap">
          <div>
            <dt className="font-medium text-gray-600">Street:</dt>
            <dd>{address.street}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">City:</dt>
            <dd>{address.city}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">State:</dt>
            <dd>{address.state}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">ZIP Code:</dt>
            <dd>{address.zip}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Country:</dt>
            <dd>{address.country}</dd>
          </div>
        </dl>
      </div>

      {/* Payment Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
          <FaCreditCard /> Payment Methods
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
          <div>
            <dt className="font-medium text-gray-600">Card Number:</dt>
            <dd>{payment.cardNumber}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Expiry:</dt>
            <dd>{payment.expiry}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-600">Cardholder Name:</dt>
            <dd>{payment.cardHolderName}</dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
