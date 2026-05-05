import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import Sidebar from "../../layouts/Sidebar";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  const role = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  return (
    <>
    <Sidebar/>
      <div className="bg-gray-50 min-h-screen pl-76 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A directory of all team members including their name, role, and
                department.
              </p>
            </div>
            <div onClick={()=>navigate("/register")} className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
              </button>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          User
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Department
                        </th>
                        <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                          Role
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-10 text-center text-sm text-gray-500 italic"
                          >
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <UserCircleIcon
                                    className="h-10 w-10 text-gray-300"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {user.username}
                                  </div>
                                  <div className="text-gray-500 flex items-center gap-1">
                                    <EnvelopeIcon className="h-3 w-3" />
                                    {user.userOfficialEmail ||
                                      "no-email@company.com"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {user.department || "General"}
                              </span>
                            </td>
                            <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                              {user.designation || "Member"}
                            </td>
                            {role === "ADMIN" && (
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {user.username}
                                  </span>
                                </a>
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
