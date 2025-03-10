import useInventories from "../../hooks/useInventories";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProductDashboard from "../../hooks/useProductDashboard";

const FeaturedStatus = ({ id }) => {
  const [inventories] = useInventories({ id });
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [, productRefetch] = useProductDashboard();

  const toggleFeaturedStatus = async (inventoryId) => {
    setLoading(true);
    const formattedData = {
      product_id: id,
      product_inventory_id: inventoryId,
    };

    try {
      const response = await axiosPublic.put(
        "/api/v1/open/products/set/featured-product?request-id=1234",
        formattedData
      );

      console.log("response", response);

      if (response.status === 200) {
        // Update local state before refetching
        await productRefetch();
        document.getElementById("my_modal_3").close();
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Product has been added to the featured collection.",
          timer: 1500, // Auto close after 1.5 seconds
          showConfirmButton: false, // No button
        });
      }
    } catch (error) {
      console.error("Error saving update:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        timer: 1500, // Auto close after 1.5 seconds
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const buttonClass = (inventory) =>
    inventory.is_featured === true
      ? "bg-green-500 hover:bg-green-600"
      : "bg-gray-500 hover:bg-gray-600";

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box max-w-6xl">
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={(e) => e.stopPropagation()}
            >
              x
            </button>
          </form>
        </div>
        <h3 className="font-bold text-lg mb-4">Manage Featured Inventory</h3>

        <div className="space-y-4">
          {inventories?.map((inventory) => (
            <div
              key={inventory.inventory_id}
              className="px-4 py-2 border rounded-lg flex flex-col sm:flex-row justify-between items-center sm:space-x-4 space-y-4 sm:space-y-0"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-10 space-y-2 sm:space-y-0">
                <p className="text-sm text-gray-600 text-nowrap">
                  Color: {inventory.color}
                </p>
                <p className="text-sm text-gray-600 text-nowrap">
                  Selling Price: Tk {inventory.selling_price}
                </p>
                <p className="text-sm text-gray-600 text-nowrap">
                  Sold Quantity: Tk {inventory.sold_quantity}
                </p>
                <p className="text-sm text-gray-600 text-nowrap">
                  Quantity: {inventory.quantity}
                </p>
              </div>

              {/* Button with improved visibility styling */}
              <div className="modal-action">
                <form method="dialog">
                  <button
                    className={`rounded-md px-4 py-1 text-base text-white sm:text-sm md:text-base lg:text-lg font-semibold ${buttonClass(
                      inventory
                    )}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFeaturedStatus(inventory.inventory_id);
                    }}
                    disabled={loading}
                  >
                    {inventory.is_featured ? "Remove Feature" : "Make Featured"}
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default FeaturedStatus;
