import useOrderDetails from "../../hooks/useOrderDetails";

const OrderDetails = ({ id }) => {
  const [orderDetails = {}] = useOrderDetails(id);

  return (
    <div className="dark:bg-[#F5F5F5] dark:text-black flex items-center">
      <div className="w-full md:w-[71%] space-y-5 px-1 sm:px-[10px] md:px-[15px] lg:px-0">
        {orderDetails?.items?.length > 0 ? (
          orderDetails.items.map((order) => (
            <div
              key={order?.sku}
              className="py-[10px] sm:p-3 flex flex-col border-y-[0.5px] border-solid md:flex-row justify-between items-start md:items-center dark:bg-[#F5F5F5] dark:text-black gap-[10px] md:gap-2"
            >
              {/* Product Image & Details */}
              <div className="flex items-center gap-[8px] md:gap-3 w-full md:w-2/5">
                <img
                  src={order?.image_url || "path/to/default-image.jpg"}
                  alt={order?.product_name}
                  className="h-[50px] w-[50px] md:h-[57px] md:w-[57px] rounded-[5px] border-[1px] border-solid"
                />
                <div className="flex flex-col space-y-[3px] md:space-y-[4px]">
                  <h1 className="font-roboto text-[12px] md:text-sm line-clamp-2 font-normal text-[#000000]">
                    {order?.product_name}
                  </h1>
                  <h1 className="font-roboto text-[9px] md:text-[10px] font-normal text-[#757575]">
                    Color: {order?.color_name}
                  </h1>
                  <h1 className="font-roboto text-[9px] md:text-[10px] font-normal text-[#757575]">
                    Sku: <span className="text-gray-700">{order?.sku}</span>
                  </h1>
                </div>
              </div>

              {/* Quantity & Pricing */}
              <div className="flex flex-row justify-between items-start md:items-center w-full sm:flex-1 gap-[3px] md:gap-0">
                <h1 className="font-roboto text-[10px] md:text-base font-normal flex items-center max-sm:gap-[3px] text-[#1E1E1E]">
                  <span className="sm:hidden block text-[#ACACAC] dark:text-black">Quantity: </span> <span className="hidden sm:block">x</span>{order?.quantity}
                </h1>
                <div className="flex flex-col">
                  <h1 className="font-roboto text-[10px] md:text-base font-normal flex items-center max-sm:gap-[3px] text-[#1E1E1E]">
                  <span className="sm:hidden block text-[#ACACAC] dark:text-black">Price: </span>{order?.selling_price} BDT
                  </h1>
                </div>
                <h1 className="font-roboto text-[10px] md:text-base font-normal flex items-center max-sm:gap-[3px] text-[#1E1E1E]">
                <span className="sm:hidden block text-[#ACACAC] dark:text-black">Total Price: </span>{order?.total_price} BDT
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-2 text-[14px] md:text-[16px]">
            No items found in this order.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
