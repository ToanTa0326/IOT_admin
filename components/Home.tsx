import { useEffect, useState } from "react";
import { child, onValue, ref, set } from "firebase/database";
import { database } from "@/firebase.config";
import { changeEmergencyStatus } from "./api";

const Home = () => {
  const emergencyRef = ref(database, "/emergency");
  const servoRef = ref(database, "/openBarrier");
  const parkingLotRef = ref(database, "/parkinglot");
  const [servo, setServo] = useState<any>();
  const [emergency, setEmergency] = useState<any>();
  const [parkingLot, setParkingLot] = useState<any>({});

  const toggleServo = (status: string) => {
    try {
      set(servoRef, status);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEmergency = (status: string) => {
    try {
      // set(emergencyRef, status);
      changeEmergencyStatus(status);
    } catch (error) {
      console.log(error);
    }
  };

  const changeSlotStatus = (slot: string) => {
    const isAvailable = parkingLot?.[slot] === "available";
    const value: string = isAvailable ? "occupied" : "available";
    set(child(parkingLotRef, `/${slot}`), value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      onValue(emergencyRef, (snapshot: any) => {
        const status = snapshot.val();
        console.log(status);
        setEmergency(status);
      });
      onValue(servoRef, (snapshot: any) => {
        const status = snapshot.val();
        console.log(status);
        setServo(status);
      });
      onValue(parkingLotRef, (snapshot: any) => {
        const data = snapshot.val();
        console.log(data);
        setParkingLot(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="p-4 flex gap-2 items-center">
        <p>Servo Status: {String(servo).toUpperCase()}</p>
        <button
          onClick={() => toggleServo(servo === "on" ? "off" : "on")}
          className="rounded-md p-2 bg-[#b57edc] text-white"
        >
          Toggle
        </button>
      </div>
      <div className="p-4 flex gap-2 items-center">
        <p>Emergency Status: {String(emergency).toUpperCase()}</p>
        <button
          onClick={() => toggleEmergency(emergency === "on" ? "off" : "on")}
          className="rounded-md p-2 bg-[#b57edc] text-white"
        >
          Toggle
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 overflow-hidden rounded-md p-5 bg-[#b57edc]">
        {Object?.keys(parkingLot)?.length !== 0 ? (
          Object?.keys(parkingLot)?.map((key: string) => (
            <div
              key={key}
              className={`border-b-1 p-4 rounded-lg text-white cursor-pointer w-[160px] text-center ${
                parkingLot[key] === "available" ? "bg-[#6fc276]" : "bg-[#ff6961]"
              }`}
              onClick={() => changeSlotStatus(key)}
            >
              <p>
                {key}: {String(parkingLot?.[key]).charAt(0).toUpperCase() + String(parkingLot?.[key]).slice(1)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
