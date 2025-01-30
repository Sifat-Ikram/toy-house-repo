import { FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          User Management
        </h1>
        <div className="mt-10 space-y-1">
            <h1 className="text-base sm:text-sm md:text-base lg:text-lg font-semibold"><span className="font-bold">Total user:</span> {users.length}</h1>
          <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-2 px-1 sm:px-2 text-left table-content sm:hidden md:block"></th>
                <th className="py-2 px-1 sm:px-2 text-left">Name</th>
                <th className="py-2 px-1 sm:px-2 text-left">Email</th>
                <th className="py-2 px-1 sm:px-2 text-left">Role</th>
                <th className="py-2 px-1 sm:px-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-1 sm:px-2 table-content sm:hidden md:block">{index + 1}</td>
                  <td className="py-2 px-1 sm:px-2">{user.name}</td>
                  <td className="py-2 px-1 sm:px-2">{user.email}</td>
                  <td className="py-2 px-1 sm:px-2 flex items-center gap-1 sm:gap-2">
                    {user?.role ? user.role : "Make Admin"}
                  </td>
                  <td className="py-2 px-1 sm:px-2 text-center">
                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                      <button
                        className="bg-red-500 text-white p-2 sm:p-3 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
