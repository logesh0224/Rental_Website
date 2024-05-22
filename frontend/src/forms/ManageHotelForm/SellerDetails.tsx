import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const SellerDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-3xl font-bold mb-3 text-teal-700">Seller Details</h1>
      <label className="text-teal-700 text-sm font-bold">
        Seller Name
        <input
          type="text"
          placeholder="Enter seller name"
          className="border rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("sellerName", { required: "This field is required" })}
        />
        {errors.sellerName && (
          <span className="text-red-500 text-xs italic">{errors.sellerName.message}</span>
        )}
      </label>
      <label className="text-teal-700 text-sm font-bold">
        Seller Email
        <input
          type="email"
          placeholder="Enter seller email"
          className="border rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("sellerEmail", { required: "This field is required" })}
        />
        {errors.sellerEmail && (
          <span className="text-red-500 text-xs italic">{errors.sellerEmail.message}</span>
        )}
      </label>
      <label className="text-teal-700 text-sm font-bold">
        Seller Phone Number
        <input
          type="tel"
          placeholder="Enter seller phone number"
          className="border rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("sellerPhoneNumber", { required: "This field is required" })}
        />
        {errors.sellerPhoneNumber && (
          <span className="text-red-500 text-xs italic">{errors.sellerPhoneNumber.message}</span>
        )}
      </label>
      <label className="text-teal-700 text-sm font-bold">
        Seller Address
        <input
          type="text"
          placeholder="Enter seller address"
          className="border rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("sellerAddress", { required: "This field is required" })}
        />
        {errors.sellerAddress && (
          <span className="text-red-500 text-xs italic">{errors.sellerAddress.message}</span>
        )}
      </label>
    </div>
  );
};

export default SellerDetails;
