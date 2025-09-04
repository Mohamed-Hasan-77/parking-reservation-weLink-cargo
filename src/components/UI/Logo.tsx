import { Car } from "lucide-react";

export default function Logo() {
return  <div className="flex-center ">
          <div className=" w-8 h-8 md:h-12 md:w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Car className=" w-5 h-5 md:h-7 md:w-7  text-white" />
          </div>
          <h2 className=" md:text-xl font-bold ">Parking Reservation</h2>
    </div>;
}
