import { useState } from "react";
import { useCheckOut } from "../../hooks/useEmployee";

export default function CheckOutForm() {
  const [ticketId, setTicketId] = useState("");
  const [forceVisitor] = useState(false);

  const checkOutMutation = useCheckOut();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkOutMutation.mutate({ ticketId, forceConvertToVisitor: forceVisitor });
    setTicketId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" box space-y-3 w-full md:w-1/2 "
    >
      <h2 className="text-xl font-bold">Check-Out</h2>

      <input
        type="text"
        placeholder="Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        className="input-handle"
      />

      <button
        type="submit"
        disabled={checkOutMutation.isPending}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {checkOutMutation.isPending ? "Checking Out..." : "Check Out"}
      </button>


      {checkOutMutation.isSuccess && (
        <div className="text-green-600">
           Ticket Checked Out. Total: {checkOutMutation.data.amount}$
        </div>
      )}
    </form>
  );
}