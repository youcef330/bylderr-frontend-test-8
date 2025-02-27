const ListingProgressBar = ({ soldPercentage }) => {
    return (
        <div className="relative w-full sm:w-1/2 h-10 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full bg-green-500"
                style={{ width: `${soldPercentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-green-700">
                {soldPercentage}% SOLD
            </span>
        </div>
    );
};

export default ListingProgressBar;