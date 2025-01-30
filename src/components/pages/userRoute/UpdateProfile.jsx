import { useForm } from "react-hook-form";
import { FaSave, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  // Sample user profile data (in real-world apps, this would come from an API or Redux store)
  const profile = {
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

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      avatar: profile.avatar,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      cardNumber: payment.cardNumber,
      expiry: payment.expiry,
      cardHolderName: payment.cardHolderName,
    },
  });

  const onSubmit = (data) => {
    // In a real-world scenario, this data would be sent to the server
    console.log("Profile updated:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Your Profile
        </h1>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              {/* Profile Image */}
              <div className="mx-auto space-y-1 w-full max-w-sm">
                <label
                  htmlFor="avatar"
                  className="block text-lg font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  id="avatar"
                  type="file"
                  {...register("avatar")}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-lg font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-lg font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                  })}
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <FaMapMarkerAlt /> Address Details
              </h2>
              <div className="space-y-2">
                {/* Street */}
                <div>
                  <label
                    htmlFor="street"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    {...register("street", { required: "Street is required" })}
                    className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-lg font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city", { required: "City is required" })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-lg font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    {...register("state", { required: "State is required" })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-lg font-medium text-gray-700"
                  >
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    type="text"
                    {...register("zip", { required: "ZIP Code is required" })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaCreditCard /> Payment Methods
              </h2>
              <div className="space-y-2 flex flex-col">
                {/* Card Number */}
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    {...register("cardNumber", {
                      required: "Card Number is required",
                    })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    {...register("expiry", {
                      required: "Expiry Date is required",
                    })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label
                    htmlFor="cardHolderName"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Cardholder Name
                  </label>
                  <input
                    id="cardHolderName"
                    type="text"
                    {...register("cardHolderName", {
                      required: "Cardholder Name is required",
                    })}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-20 mt-8">
              <button
                type="submit"
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
              <Link to={"/dashboard/profile"}>
                <button
                  type="submit"
                  className="flex items-center bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <GiCancel className="mr-2 text-xl" /> Save Changes
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
