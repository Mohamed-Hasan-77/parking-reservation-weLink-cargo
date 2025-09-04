import ZonesList from "../../components/Layout/ZonesList";
import CheckInOut from "./CheckInOut";
import TicketsPage from "./TicketsPage";

export default function ZonesPage() {

  return (
    <div className=" p-6 ">
          <CheckInOut/>
          <TicketsPage/>
          <ZonesList />
    </div>
  );
}
