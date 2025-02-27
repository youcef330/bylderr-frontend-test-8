/**
 * Joins an array into a comma-separated string with "and" before the last item.
 *
 */
const joinWithCommaAnd = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(" and ");
    const last = arr[arr.length - 1];
    const head = arr.slice(0, -1);
    return `${head.join(", ")}, and ${last}`;
};

export default joinWithCommaAnd