import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border rounded-lg border-gray-200 shadow-md p-4 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h4 className="text-lg font-semibold mb-2 text-green-500">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <label className="flex items-center space-x-2" key={hotelType}>
          <input
            type="checkbox"
            className="rounded border-gray-400 focus:ring-green-500 focus:border-green-500"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span className="text-gray-700">{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
