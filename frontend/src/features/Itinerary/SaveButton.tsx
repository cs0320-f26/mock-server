// import { Link } from "react-router-dom";
// import { useUser } from "../../firebase/useUser";
// import axios from "axios";

type TripData = {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  // we probably want more fields to give more information to our users... but what do I know im just an intern - Roberto
};

interface SaveTripButtonProps {
  tripData: TripData;
}

export default function SaveTripButton({ tripData }: SaveTripButtonProps) {
  //TODO: Only uncomment these after Sprint 6
  // const { isSignedIn, user } = useUser();

  const saveTrip = async () => {
    // if (!isSignedIn) return;
    // try {
    //   const response = await axios.post("http://localhost:3001/savePins", {
    //     userId: user?.uid,
    //     ...tripData,
    //   });
    //   console.log("Trip saved:", response.data);
    //   alert("Trip saved successfully!");
    // } catch (error) {
    //   console.error("Error saving trip:", error);
    //   alert("Failed to save trip.");
    // }
  };

  // if (!isSignedIn) {
  //   return (
  //     <Link to="/login">
  //       <button className="bg-gray-400 text-white rounded px-4 py-2 cursor-pointer">
  //         Sign in to Save
  //       </button>
  //     </Link>
  //   );
  // }

  return (
    <button
      onClick={saveTrip}
      className="bg-blue-500 text-white rounded px-4 py-2"
    >
      Save Trip
    </button>
  );
}
