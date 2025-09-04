import { useState } from "react";
import { useCheckIn, useGates, useZones } from "../../hooks/useEmployee";

export default function CheckInForm() {
  const [gateId, setGateId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [type, setType] = useState<"visitor" | "subscriber">("visitor");
  const [subscriptionId] = useState("");

  const { data: gates, isLoading: LoadingGates, isError: ErrorGates } = useGates();
  const { data: zones, isLoading: LoadingZones, isError: ErrorZones } = useZones();

  const checkInMutation = useCheckIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkInMutation.mutate({ gateId, zoneId, type, subscriptionId });
  };

  const handleGateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGateId(e.target.value);
    setZoneId(""); // Reset zone when gate changes
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoneId(e.target.value);
  };

  // Filter zones to only those available for the selected gate
  const filteredZones =
    gateId && zones
      ? zones.filter((zone: any) => zone.gateIds.includes(gateId))
      : zones || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 box w-full md:w-1/2"
    >
      <h2 className="text-xl font-bold">Check-In</h2>

      <select
        value={gateId}
        onChange={handleGateChange}
        className="input-handle"
        disabled={LoadingGates || ErrorGates}
      >
        <option value="">Select Gate</option>
        {gates &&
          gates.map((gate: any) => (
            <option key={gate.id} value={gate.id}>
              {gate.name} ({gate.location})
            </option>
          ))}
      </select>

      <select
        value={zoneId}
        onChange={handleZoneChange}
        className="input-handle"
        disabled={!gateId || LoadingZones || ErrorZones}
      >
        <option value="">Select Zone</option>
        {filteredZones &&
          filteredZones.map((zone: any) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
      </select>

      <select
        value={"visitor"}
        onChange={(e) => setType(e.target.value as "visitor" | "subscriber")}
        className="input-handle hidden"
      >
        <option value="visitor">Visitor</option>
        <option value="subscriber">Subscriber</option>
      </select>

      <button
        type="submit"
        disabled={checkInMutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {checkInMutation.isPending ? "Checking In..." : "Check In"}
      </button>

      {checkInMutation.isSuccess && (
        <p className="text-green-600"> Ticket ID: {checkInMutation.data.ticket.id}</p>
      )}
    </form>
  );
}