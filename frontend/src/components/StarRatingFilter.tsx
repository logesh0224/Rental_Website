type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border rounded-lg border-gray-200 shadow-md p-4 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h4 className="text-lg font-semibold mb-2 text-green-500">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label className="flex items-center space-x-2" key={star}>
          <input
            type="checkbox"
            className="rounded border-gray-400 focus:ring-green-500 focus:border-green-500"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span className="text-gray-700">{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
