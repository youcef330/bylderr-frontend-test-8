/**
 * Formats a string value by replacing underscores with spaces, adding spaces before
 * capital letters, and capitalizing the first letter of each word.
 *
 */
const formatValue = (val) => {
    if (typeof val !== 'string') return val;
    return val
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default formatValue