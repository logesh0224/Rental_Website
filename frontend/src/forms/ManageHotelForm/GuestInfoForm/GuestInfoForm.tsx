import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  policiesAccepted: boolean;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoFormData>();

  const onSubmit = () => {
    if (isLoggedIn) {
      // Handle form submission
      navigate(`/hotel/${hotelId}/booking`);
    } else {
      // Redirect to sign-in page
      navigate("/sign-in", { state: { from: location } });
    }
  };

  return (
    <div className="flex flex-col p-4 bg-teal-200 rounded-md gap-4">
      <h3 className="text-md font-bold">{pricePerNight}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="policiesAccepted"
            {...register("policiesAccepted", { required: true })}
            defaultChecked // Default to checked
            className="h-5 w-5 text-teal-600 rounded-sm focus:ring-teal-400"
          />
          <label htmlFor="policiesAccepted" className="ml-2 text-gray-700 font-semibold">
            Accept Policies
          </label>
        </div>
        {errors.policiesAccepted && (
          <span className="text-red-500 text-sm font-bold">
            Please accept the policies
          </span>
        )}
        <button
          type="submit"
          className="bg-teal-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-500 transition duration-300"
        >
          {isLoggedIn ? "Book Now" : "Sign in to Book"}
        </button>
      </form>
    </div>
  );
};

export default GuestInfoForm;
