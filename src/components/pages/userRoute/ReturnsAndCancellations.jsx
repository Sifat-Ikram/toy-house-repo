const ReturnsAndCancellations = () => {
  const userId = 1; // Example logged-in user ID

  // Demo data for returns and cancellations
  const returnsAndCancellations = [
    {
      id: 1,
      userId: 1,
      name: "Toy Car",
      image: "https://via.placeholder.com/100",
      price: 500,
      reason: "Defective item",
      status: "Returned",
      purchaseDate: "2024-11-25",
      cancelledDate: "2024-12-01",
      cancelledTime: "10:30 AM",
    },
    {
      id: 2,
      userId: 1,
      name: "Doll House",
      image: "https://via.placeholder.com/100",
      price: 1200,
      reason: "Changed mind",
      status: "Cancelled",
      purchaseDate: "2024-11-20",
      cancelledDate: "2024-11-28",
      cancelledTime: "02:15 PM",
    },
    {
      id: 3,
      userId: 2,
      name: "Action Figure",
      image: "https://via.placeholder.com/100",
      price: 900,
      reason: "Incorrect size",
      status: "Returned",
      purchaseDate: "2024-11-15",
      cancelledDate: "2024-11-20",
      cancelledTime: "11:00 AM",
    },
  ];

  // Filtered data for the logged-in user
  const userReturnsAndCancellations = returnsAndCancellations.filter(
    (item) => item.userId === userId
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Returns and Cancellations
      </h1>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {userReturnsAndCancellations.length > 0 ? (
          <div className="space-y-6">
            {userReturnsAndCancellations.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h1>
                    <span className="text-lg font-semibold text-red-500">
                      OrderId:
                    </span>{" "}
                    {item.id}
                  </h1>
                  <button
                    className="text-red-500 text-lg font-semibold hover:underline"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    See Details
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost hover:bg-red-500 bg-red-500 text-white absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div>
                        <div className="space-y-6">
                          <div className="flex gap-6 items-center">
                            <img
                              id="item-image"
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg shadow-md border"
                            />
                            <div className="flex flex-col space-y-2">
                              <h3 className="text-xl font-bold text-gray-800">
                                {item.name}
                              </h3>
                              <p className="text-lg font-semibold text-gray-800">
                                <span className="font-bold">Price:</span>{" "}
                                {item.price} Tk
                              </p>
                            </div>
                          </div>
                          <p className="text-base font-semibold text-gray-800">
                            <span className="font-bold">Reason:</span>{" "}
                            {item.reason}
                          </p>
                          <p className="text-base font-semibold text-red-500">
                            <span className="font-bold text-gray-800">
                              Status:
                            </span>{" "}
                            {item.status}
                          </p>
                          <p className="text-base font-semibold text-gray-800">
                            <span className="font-bold">Purchase Date:</span>{" "}
                            {item.purchaseDate}
                          </p>
                          <p className="text-base font-semibold flex items-center text-red-500">
                            <span className="font-bold text-gray-800">
                              Cancelled Date:{" "}
                            </span>{" "}
                            {item.cancelledDate} {item.cancelledTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div
                  key={item.id}
                  className="border-2 rounded-lg shadow-lg p-6 flex gap-8 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Price:</span> {item.price} Tk
                    </p>
                    <p className="text-red-500 mb-1">
                      <span className="text-gray-700 font-medium">Status:</span>{" "}
                      {item.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No returns or cancellations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReturnsAndCancellations;
