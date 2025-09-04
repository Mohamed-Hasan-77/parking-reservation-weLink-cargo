import { useState } from "react";
import { useAddRushHour, useAddVacation } from "../../hooks/useAdmin";
import toast from "react-hot-toast";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function RushHours() {
  const { mutate: addRushHour, isPending } = useAddRushHour();

  const [form, setForm] = useState({ weekDay: 0, from: "", to: "" });
  const [Vform, setVForm] = useState({ name: "", from: "", to: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from || !form.to) {
        toast.error("Please fill all fields");
        return
    };
    addRushHour(form);
    setForm({ weekDay: 0, from: "", to: "" });
    toast.success("successfully added");
  };


  const { mutate: addVacation, isPending : isPendingVactions } = useAddVacation();


  const handleSubmitVactions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Vform.name || !Vform.from || !Vform.to) {
        toast.error("Please fill all fields");
        return
    };
    addVacation(Vform);
    setVForm({ name: "", from: "", to: "" });
    toast.success("successfully added");
  };

  return <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rush Hours Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <select
          value={form.weekDay}
          onChange={(e) =>
            setForm({ ...form, weekDay: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
        >
          {weekDays.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="time"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:blue-400"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>

    <div className="vacations">
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vacations Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmitVactions}
        className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Vacation Name"
          value={Vform.name}
          onChange={(e) => setVForm({ ...Vform, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={Vform.from}
          onChange={(e) => setVForm({ ...Vform, from: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={Vform.to}
          onChange={(e) => setVForm({ ...Vform, to: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:blue-400"
          disabled={isPendingVactions}
        >
          {isPendingVactions ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
    </div>
  </>
}
