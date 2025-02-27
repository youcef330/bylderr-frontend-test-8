/**
 * Utility function to format a number as USD currency
 * Shows decimals only if there are non-zero values in the tenths or hundredths place.
 *
 */
const formatToUSD = (value) => {
    const options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
    };
    return value.toLocaleString("en-US", options);
};

export default formatToUSD;