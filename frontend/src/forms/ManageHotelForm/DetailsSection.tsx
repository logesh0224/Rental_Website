import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-3xl font-bold mb-3 text-green-800">Add House</h1>
      <label className="text-gray-700 text-sm font-bold">
        Name
        <input
          type="text"
          placeholder="Enter house name"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs italic">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold">
          LandMark
          <input
            type="text"
            placeholder="Enter NearBy landmark"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 text-xs italic">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Area
          <input
            type="text"
            placeholder="Enter area"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-xs italic">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Description
        <textarea
          rows={6}
          placeholder="Enter description like about the house 1BHK..Etc.,"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 text-xs italic">{errors.description.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold">
          Price Per Month (Rs)
          <input
            type="number"
            min={1}
            placeholder="Enter price per month"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("pricePerMonth", { required: "This field is required" })}
          />
          {errors.pricePerMonth && (
            <span className="text-red-500 text-xs italic">{errors.pricePerMonth.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Star Rating
          <select
            {...register("starRating", { required: "This field is required" })}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-xs italic">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
