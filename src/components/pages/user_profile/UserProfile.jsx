import { useEffect } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import useUserOrders from "../../hooks/useUserOrders";
import ExportDetails from "./ExportDetails";
import OrderDetails from "./OrderDetails";

const UserProfile = () => {
  const { userData, userIsLoading, error } = useUserProfile();
  const [userOrders] = useUserOrders();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  if (userIsLoading)
    return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  // Destructure the data if available
  const { name, email, phone_number } = userData || {};

  return (
    <div className="min-h-screen bg-white dark:bg-white dark:text-black max-sm:px-[10px] max-md:px-[5px] flex flex-col items-center space-y-6 md:space-y-10 py-6 md:py-10">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-poppins font-semibold text-center">
        User Profile
      </h1>
      <div className="w-full sm:w-11/12 md:w-4/5 rounded-[10px] py-2 sm:py-[10px] md:py-[16px] lg:py-[26px] mx-auto bg-[#F5F5F5] dark:bg-[#F5F5F5]">
        <div className="w-11/12 md:w-5/6 mx-auto flex max-sm:flex-wrap items-center justify-between bg-[#F5F5F5] dark:bg-[#F5F5F5]">
          <div className="flex flex-col items-start text-[10px] sm:text-xs md:text-sm lg:text-lg font-roboto font-normal">
            <h1 className="text-[#757575] dark:text-[#757575]">
              Customer Name :
            </h1>
            <h1 className="text-[#000000] dark:text-[#000000]">{name}</h1>
          </div>
          <div className="flex flex-col items-start text-[10px] sm:text-xs md:text-sm lg:text-lg font-roboto font-normal">
            <h1 className="text-[#757575] dark:text-[#757575]">
              Customer Email :{" "}
            </h1>
            <h1 className="text-[#000000] dark:text-[#000000]">{email}</h1>
          </div>
          <div className="flex flex-col items-start text-[10px] sm:text-xs md:text-sm lg:text-lg font-roboto font-normal">
            <h1 className="text-[#757575] dark:text-[#757575]">
              Customer Phone Number :{" "}
            </h1>
            <h1 className="text-[#000000] dark:text-[#000000]">
              {phone_number}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-11/12 md:w-4/5 mx-auto bg-white dark:bg-white space-y-2 sm:space-y-[14px] py-[6px] sm:py-2 md:py-[10px] px-[6px] sm:px-2 md:px-[10px] rounded-[14px] flex flex-col border-[1px] border-solid">
        <div className="w-full bg-[#F5F5F5] dark:bg-[#F5F5F5] py-1 sm:py-3 md:py-[15px] px-2 sm:px-3 md:px-[27px] rounded-[14px]">
          <h1 className="font-poppins font-normal sm:font-semibold text-sm md:text-xl">
            My Orders
          </h1>
        </div>
        <div className="w-full flex flex-col space-y-2 sm:space-y-3">
          {userOrders.length === 0 ? (
            <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-center">
              There is no orders
            </h1>
          ) : (
            userOrders?.map((order) => (
              <div
                key={order?.order_id}
                className="bg-[#F5F5F5] dark:bg-[#F5F5F5] py-2 sm:py-3 md:py-4 px-[10px] sm:px-3 md:px-[27px] rounded-[10px] sm:rounded-[14px] space-y-2 border-solid border-[1px]"
              >
                <div className="flex flex-row items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-[6px] sm:gap-3 md:gap-5">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <h1 className="font-roboto text-[10px] md:text-sm font-normal text-[#ACACAC]">
                        Order ID :
                      </h1>
                      <h1 className="font-roboto text-[#0077FF] text-[10px] sm:text-sm font-normal">
                        {order?.order_id}
                      </h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-[#ACACAC]">
                        Status :
                      </h1>
                      <h1
                        className="font-roboto text-[10px] sm:text-sm font-normal"
                        style={{
                          color:
                            order?.order_status === "PENDING"
                              ? "#FFAE00"
                              : order?.order_status === "CONFIRMED"
                              ? "#008000"
                              : order?.order_status === "DELIVERED"
                              ? "#0000FF"
                              : order?.order_status === "SHIPPED"
                              ? "#4B0082"
                              : order?.order_status === "CANCELLED"
                              ? "#FF0000"
                              : order?.order_status === "RETURNED"
                              ? "#8B4513"
                              : order?.order_status === "REFUNDED"
                              ? "#9400D3"
                              : order?.order_status === "FAILED"
                              ? "#DC143C"
                              : "inherit",
                        }}
                      >
                        {order?.order_status}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center max-sm:space-y-1 sm:gap-2 md:gap-3 lg:gap-5">
                    <div className="flex items-center space-x-1 sm:space-x-3">
                      <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-[#ACACAC]">
                        Total Amount :
                      </h1>
                      <h1 className="font-roboto text-[#0077FF] text-[10px] sm:text-sm font-normal">
                        {order?.payable_amount} BDT
                      </h1>
                    </div>
                    <div>
                      <ExportDetails
                        user={userData}
                        id={order?.order_id}
                        order={order}
                      />
                    </div>
                  </div>
                </div>
                <OrderDetails id={order?.order_id} />
                <div className="p-2 sm:p-3 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-[#999999]">
                    Created At :{" "}
                    {new Date(order?.order_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    {new Date(order?.order_date).toLocaleTimeString()}
                  </h1>
                  {order?.delivery_date ? (
                    <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-[#999999]">
                      Delivery Date:{" "}
                      {new Date(order?.delivery_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      {new Date(order?.delivery_date).toLocaleTimeString()}
                    </h1>
                  ) : (
                    <h1 className="font-roboto text-[10px] sm:text-sm font-normal text-[#999999]">
                      No delivery date
                    </h1>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
