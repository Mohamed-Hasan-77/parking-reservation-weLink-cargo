import { useParkingStateReport } from "../../hooks/useAdmin";

const ReportsPage = () => {
  const { data, isLoading, isError } = useParkingStateReport();

  if (isLoading) return <p>Loading report...</p>;
  if (isError) return <p>Error fetching report</p>;
  if (!data) return <p>No report data available</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Parking State Report</h1>

      {/* Zones summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((zone) => {
          const occupancy = Math.round(
            (zone.occupied / zone.totalSlots) * 100
          );

          return (
            <div
              key={zone.zoneId}
              className="p-4 box"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">{zone.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    zone.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {zone.open ? "Open" : "Closed"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Total Slots: {zone.totalSlots}
              </p>

              {/* Occupancy progress */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Occupancy</span>
                  <span>{occupancy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-indigo-500 h-4 rounded-full"
                    style={{ width: `${occupancy}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <div>Occupied: {zone.occupied}</div>
                <div>Free: {zone.free}</div>
                <div>Reserved: {zone.reserved}</div>
                <div>Subscribers: {zone.subscriberCount}</div>
                <div>Avail. Subs: {zone.availableForSubscribers}</div>
                <div>Avail. Visitors: {zone.availableForVisitors}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsPage;
