const OffersPage = () => {
  const offers = [
    {
      id: "OFF001",
      title: "Winter Wonderland Deal",
      description: "Get 20% off all toy cars and building sets.",
      discount: "20%",
      appliesTo: "Toy Cars, Building Sets",
      validity: "Dec 1 - Dec 25",
    },
    {
      id: "OFF002",
      title: "Buy 2 Get 1 Free",
      description: "Buy 2 action figures, get 1 free!",
      discount: "Buy 2 Get 1 Free",
      appliesTo: "Action Figures",
      validity: "Jan 10 - Jan 15",
    },
    {
      id: "OFF003",
      title: "Special Holiday Discount",
      description: "Flat 15% off on all puzzles and board games.",
      discount: "15%",
      appliesTo: "Puzzles, Board Games",
      validity: "Dec 20 - Jan 5",
    },
    {
      id: "OFF004",
      title: "Mega Doll Sale",
      description: "Get up to 30% off on all doll collections.",
      discount: "Up to 30%",
      appliesTo: "Dolls",
      validity: "Feb 1 - Feb 10",
    },
  ];

  return (
    <div className="p-1 sm:p-[6px] md:p-3 lg:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Offers
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Discount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Applies To
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Validity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr key={offer.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 font-medium">
                  {offer.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.discount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.appliesTo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.validity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-4">
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffersPage;
