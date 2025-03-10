import Swal from "sweetalert2";
import useImage from "../../hooks/useImage";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const InventoryImages = ({ inventoryId }) => {
  const [images, imageRefetch] = useImage(inventoryId);
  const axiosPublic = useAxiosPublic();

  const handleDelete = async (imageId) => {
    // Display confirmation dialog with SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-red-500 text-white",
        cancelButton: "bg-[#31b2f3] text-white",
      },
    });

    if (result.isConfirmed) {
      try {
        // Send DELETE request to your API
        const response = await axiosPublic.delete(
          `api/v1/admin/product/inventory/delete/image?image-id=${imageId}&request-id=1234`
        );

        // If delete is successful, remove the image from the state
        if (response.status === 200) {
          imageRefetch();
          Swal.fire("Deleted!", "The image has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "There was an issue deleting the image.",
            "error"
          );
        }
      } catch (error) {
        console.log(error.message);
        Swal.fire("Error!", "There was an error deleting the image.", "error");
      }
    } else {
      // If the user cancels
      Swal.fire("Cancelled", "Your image is safe :)", "info");
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-5 overflow-x-auto pt-3 pb-5">
      {images && images.length > 0 ? (
        images.map((img) => (
          <div key={img?.product_image_id} className="relative group">
            <img
              src={img?.image_url}
              className="h-36 w-36 border-2 border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              alt="Inventory"
            />
            <button
              className="absolute text-sm top-0 right-0 py-1 px-2 text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transform transition-all duration-200"
              onClick={() => handleDelete(img?.product_image_id)}
            >
              X
            </button>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500 text-center">
          There are no images!
        </p>
      )}
    </div>
  );
};

export default InventoryImages;
