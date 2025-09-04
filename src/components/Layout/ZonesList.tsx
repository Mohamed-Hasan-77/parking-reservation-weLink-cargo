import { useZones } from "../../hooks/useEmployee";
import { useToggleZone } from "../../hooks/useAdmin";
import { useAuthStore } from "../../store/useUserStore";
import Loader from "../UI/Loader";
import { useWebSockets } from "../../hooks/useWebSocket";
import Error from "../UI/Error";

export default function ZoneList() {
  const { data: zones, isLoading, isError } = useZones();
  const { user } = useAuthStore();
  const toggleZoneMutation = useToggleZone();

    useWebSockets("gate_1");

  if (isLoading) return <Loader/>;
  if (isError) return <Error/>;


    const handleToggle = (id : string, open : boolean) => {
      toggleZoneMutation.mutate({
        id: id,
        open: !open,
      });
    };



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-7">
      {zones?.map((zone) => {
        const available = zone.totalSlots - zone.occupied;
        return <div
            key={zone.id}
            className="bg-white rounded-xl shadow p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">{zone.name}</h3>
            <p className="text-xs text-gray-400 mb-1">ID: {zone.id}</p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Category:</span> {zone.categoryId}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-semibold">Gates:</span>{" "}
              {zone.gateIds.join(", ")}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center my-3">
              <div className="bg-blue-100 text-blue-700 rounded-lg py-2">
                <p className="font-bold">{zone.totalSlots}</p>
                <p className="text-xs">Total</p>
              </div>
              <div className="bg-red-100 text-red-700 rounded-lg py-2">
                <p className="font-bold">{zone.occupied}</p>
                <p className="text-xs">Occupied</p>
              </div>
              <div className="bg-green-100 text-green-700 rounded-lg py-2">
                <p className="font-bold">{available}</p>
                <p className="text-xs">Available</p>
              </div>
            </div>

            <p
              className={`mt-3 font-semibold text-center py-2 rounded-lg ${
                zone.open
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {zone.open ? "Open " : "Closed "}
            </p>

            {user?.role === "admin" && (
              <button
                onClick={() => handleToggle(zone.id, zone.open)}
                disabled={toggleZoneMutation.isPending}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {toggleZoneMutation.isPending
                  ? "Updating..."
                  : zone.open
                  ? "Close Zone"
                  : "Open Zone"}
              </button>
            )}
          </div>
      })}
    </div>
  );
}
