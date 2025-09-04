import CheckInForm from "../../components/UI/CheckInForm";
import CheckOutForm from "../../components/UI/CheckOutForm";

export default function CheckInOut() {
  return <>
    <div className="checkInOut flex gap-2 flex-wrap md:flex-nowrap">
         <CheckInForm />
        <CheckOutForm />
     </div>
  
  </>;
}
