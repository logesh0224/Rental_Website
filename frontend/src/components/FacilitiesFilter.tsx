import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border rounded-lg border-gray-200 shadow-md p-4 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h4 className="text-lg font-semibold mb-2 text-green-500">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2" key={facility}>
          <input
            type="checkbox"
            className="rounded border-gray-400 focus:ring-green-500 focus:border-green-500"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span className="text-gray-700">{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
