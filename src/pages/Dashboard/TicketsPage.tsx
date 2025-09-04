import { useState } from "react";
import { Search } from "lucide-react";
import api from "../../api/axiosInit";

 type Ticket = {
  id: string;
  zoneId: string;
  gateId: string;
  type: string; 
  checkinAt: string; 
  checkoutAt: string | null; 
};

export default function TicketsPage() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!ticketId) return;
    setLoading(true);
    setError("");
    setTicket(null);

    try {
      const res = await api.get(`/tickets/${ticketId}`);
      console.log('res:', res.data);
      setTicket(res.data);
    } catch (err: any) {
      setError("Ticket not found or error fetching ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Search Ticket</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="input-handle w-full"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="btn btn-primary flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {ticket && (

         <ul className="list bg-base-100 rounded-box shadow-md">
  
            <li className="p-4 pb-2 text-xl opacity-70 tracking-wide">Ticket Details</li>
            
            <li className="list-row text-lg">
                <div className="font-bold ">ID:</div>
                <p className="text-gray-500">{ticket.id}</p>
            </li>
            <li className="list-row text-lg">
                <div className="font-bold ">Zone:</div>
                <p className="text-gray-500">{ticket.zoneId}</p>
            </li>
            <li className="list-row text-lg">
                <div className="font-bold ">Gate:</div>
                <p className="text-gray-500">{ticket.gateId}</p>
            </li>
            <li className="list-row text-lg">
                <div className="font-bold ">Check-in:</div>
                <p className="text-gray-500">{ticket.checkinAt}</p>
            </li>
            <li className="list-row text-lg">
                <div className="font-bold ">Check-out:</div>
                <p className="text-gray-500">{ticket.checkoutAt || "Not yet"}</p>
            </li>
          </ul>
  
      )}
    </div>
  );
}
