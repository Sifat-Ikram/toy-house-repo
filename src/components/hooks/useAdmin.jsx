// import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
//   const axiosSecure = useAxiosSecure();

  // Query to check admin status
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
    // [user?.email, "isAdmin"],
    // async () => {
    //   const res = await axiosSecure.get(`/user/admin/${user.email}`);
    //   return res.data?.admin; // Return admin status
    // },
    // {
    //   enabled: !!user?.email && !loading,
    // }
  );

  // Return admin status and loading state
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
