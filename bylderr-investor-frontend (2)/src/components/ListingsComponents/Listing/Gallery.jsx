import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';


/**
 * Gallery Component
 * 
 * Displays a gallery of images with a large display image that supports swipe gestures.
 * Includes a 2x2 grid of smaller images for quick selection. Users can swipe left or right
 * to navigate through images or click a thumbnail to swap it with the large image.
 * 
 */



const Gallery = ({ initialImages }) => {
    const [images, setImages] = useState(initialImages);
    const [largeImageIndex, setLargeImageIndex] = useState(0);

    // Handlers for swipe gestures 
    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    // Handles swipe gestures to navigate through images
    const handleSwipe = (direction) => {
        if (direction === 'left') {
            setLargeImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (direction === 'right') {
            setLargeImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    // Swaps the currently displayed large image with a selected small image
    const swapImages = (smallImageIndex) => {
        if (smallImageIndex === largeImageIndex) return;

        const newImages = [...images];
        [newImages[largeImageIndex], newImages[smallImageIndex]] = [newImages[smallImageIndex], newImages[largeImageIndex]];
        setImages(newImages);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-4 pt-2">
            {/* Large Image */}
            <div className="flex justify-center relative" {...handlers}>
                <img
                    src={images[largeImageIndex]}
                    alt="Large Display"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.375rem',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                    }}
                />

                {/* Tracker Dots */}
                <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`h-3 w-3 rounded-full ${index === largeImageIndex ? 'bg-midnight-blue' : 'bg-gray-400'
                                } cursor-pointer`}
                            onClick={() => setLargeImageIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>

            {/* 2x2 Grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {images.map((image, index) => {
                        if (index === largeImageIndex) return null;

                        return (
                            <div key={index} className="cursor-pointer">
                                <img
                                    src={image}
                                    alt={`Gallery thumbnail ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '0.375rem',
                                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                                    }}
                                    onClick={() => swapImages(index)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// PropTypes for type checking
Gallery.propTypes = {
    initialImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;