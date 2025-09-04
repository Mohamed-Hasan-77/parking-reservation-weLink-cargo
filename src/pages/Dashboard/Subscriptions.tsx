import { useState } from "react";
import Loader from "../../components/UI/Loader";
import Error from "../../components/UI/Error";
import { useSubscriptionById, useSubscriptions } from "../../hooks/useAdmin";

export default function Subscriptions() {
  const { data: subscriptions, isLoading, isError } = useSubscriptions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: subscriptionDetails } = useSubscriptionById(selectedId || "");

  if (isLoading) return <Loader/>;
  if (isError) return <Error/>;

  return (
       <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Subscriptions Management</h1>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">User</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Active</th>
            <th className="px-4 py-2 border-b">Cars</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions?.map((sub) => (
            <tr key={sub.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{sub.id}</td>
              <td className="px-4 py-2 border-b">{sub.userName}</td>
              <td className="px-4 py-2 border-b">{sub.category}</td>
              <td className="px-4 py-2 border-b">
                {sub.active ? (
                  <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border-b">
                {sub.cars.map((car) => (
                  <div key={car.plate} className="text-xs">
                    {car.plate} ({car.brand})
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => setSelectedId(sub.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {selectedId && subscriptionDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop:blur-2xl bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
            <p><strong>ID:</strong> {subscriptionDetails.id}</p>
            <p><strong>User:</strong> {subscriptionDetails.userName}</p>
            <p><strong>Category:</strong> {subscriptionDetails.category}</p>
            <p><strong>Status:</strong> {subscriptionDetails.active ? "Active" : "Inactive"}</p>
            <p><strong>Start:</strong> {new Date(subscriptionDetails.startsAt).toLocaleDateString()}</p>
            <p><strong>Expires:</strong> {new Date(subscriptionDetails.expiresAt).toLocaleDateString()}</p>
            <p><strong>Cars:</strong></p>
            <ul className="list-disc pl-5">
              {subscriptionDetails.cars.map((car) => (
                <li key={car.plate}>
                  {car.plate} - {car.brand} {car.model} ({car.color})
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedId(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
