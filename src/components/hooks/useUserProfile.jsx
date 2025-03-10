import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const useUserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchUserProfile = async () => {
    if (!user) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axiosPublic.get(
      "/api/v1/user/get/profile?request-id=1234",
      {
        headers: {
          Authorization: `Bearer ${user}`, // Adjust based on your context structure
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    onError: (err) => setError(err.message),
    enabled: !!user, // Only run if token exists
  });

  return { userData, userIsLoading, userIsError, error };
};

export default useUserProfile;
