import { useState } from "react";
import { useCategories, useUpdateCategoryRate } from "../../hooks/useAdmin";
import Loader from "../../components/UI/Loader";
import Error from "../../components/UI/Error";

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();
  const updateCategory = useUpdateCategoryRate();
  const [editing, setEditing] = useState<{ [key: string]: number }>({});

  if (isLoading) return <Loader/>;
  if (isError) return <Error/>;


    const handleCategoryRateCahnge = (e : any, id : string) => {
        setEditing((prev) => ({...prev,[id]: Number(e.target.value)}))
    }

    const updateCategoryRate = (id : string, rate : number) => {
        updateCategory.mutate({id, rate});
    }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Categories Management</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b">ID</th>
            <th className="p-3 text-left border-b">Name</th>
            <th className="p-3 text-left border-b">Rate</th>
            <th className="p-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cat.id}</td>
              <td className="p-3 border-b">{cat.name}</td>
              <td className="p-3 border-b">
                <input
                  type="number"
                  name="rate"
                  id={cat.id}
                  value={editing[cat.id] ?? cat.rateNormal}
                  onChange={(e) => handleCategoryRateCahnge(e, cat.id)}
                  className="w-24 border rounded p-1"
                />
              </td>
              <td className="p-3 border-b">
                <button
                  onClick={() => updateCategoryRate(cat.id, editing[cat.id] ?? cat.rateNormal)}
                  disabled={updateCategory.isPending}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {updateCategory.isPending ? "Updating..." : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}