const formatPrice = (price) => {
    const formattedPrice = price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(0)}M`;
    }
    return `$${formattedPrice}`;
};

export default formatPrice