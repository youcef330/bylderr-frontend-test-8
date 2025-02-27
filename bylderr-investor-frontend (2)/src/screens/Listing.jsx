import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Gallery from '../components/ListingsComponents/Listing/Gallery';
import MapBox from '../components/ListingsComponents/MapBox';
import DeveloperInfo from '../components/ListingsComponents/Listing/DeveloperInfo';
import DividentInfo from '../components/ListingsComponents/Listing/DividentInfo';
import CashAndFinancing from '../components/ListingsComponents/Listing/CashAndFinancing';
import Documents from '../components/ListingsComponents/Listing/Documents';
import InvestCard from '../components/ListingsComponents/Listing/InvestCard';
import OwnershipCard from '../components/ListingsComponents/Listing/OwnershipCard';
import ListingProgressBar from '../components/ListingsComponents/Listing/ListingProgressBar';
import PriceActions from '../components/ListingsComponents/Listing/PriceAction';
import SavePropertyButton from '../components/ListingsComponents/Listing/SavePropertyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faHouse } from '@fortawesome/free-solid-svg-icons';
import { fetchListingById } from '../api/listingsApi';
import { mockListings } from '../mockData/mockListings';
import Comments from '../components/ListingsComponents/Listing/Comments';
import AdditionalPropertyDetails from '../components/ListingsComponents/Listing/AdditionalPropertyDetails';
import LocationDetails from '../components/ListingsComponents/Listing/LocationDetails';
import BackButton from '../components/BackButton';


const Listing = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [initialImages, setInitialImages] = useState([]);
    const [addressCoordinates, setAddressCoordinates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!propertyId) {
            console.error('No propertyId found in URL.');
            setError('Invalid listing ID.');
            return;
        }

        const fetchData = async () => {
            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                const mockListing = mockListings.find(
                    (listing) => String(listing.id) === String(propertyId)
                );

                if (mockListing) {
                    setListing(mockListing);
                    setInitialImages(mockListing.initialImages);
                    setAddressCoordinates(mockListing.addressCoordinates);
                } else {
                    console.error('Listing ID not found in mock data');
                    setError('Listing not found.');
                }
            } else {
                try {
                    const response = await fetchListingById(propertyId);

                    if (!response.ok) {
                        throw new Error(`API response not ok: ${response.status}`);
                    }

                    setListing(response);
                    setInitialImages(response.initialImages);
                    setAddressCoordinates(response.addressCoordinates);
                } catch (error) {
                    console.error('Fetching data failed:', error.message);
                    setError('Failed to fetch data. Using mock data.');

                    // Use mock data corresponding to the propertyId
                    const mockListing = mockListings.find(
                        (listing) => String(listing.id) === String(propertyId)
                    );

                    if (mockListing) {
                        console.log('Using mock data for propertyId:', propertyId);
                        setListing(mockListing);
                        setInitialImages(mockListing.initialImages);
                        setAddressCoordinates(mockListing.addressCoordinates);
                    } else {
                        console.error('Listing ID not found in mock data');
                        setError('Listing not found.');
                    }
                }
            }
        };

        fetchData();
    }, [propertyId]);

    const formatCurrency = (value) =>
        `${value.toLocaleString('en', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;

    if (!listing) {
        return (
            <div className="flex items-center justify-center h-screen">
                {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
            </div>
        );
    }

    const { data } = listing;

    return (
        <>
            <div className='px-10 pt-5'>
                <BackButton />
            </div>



            <div className="px-5 sm:px-60 pt-5 min-h-screen">
                {/* Error */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 mb-5 rounded mt-2">
                        {error}
                    </div>
                )}
                <div className='flex justify-between mb-10'>
                    <h1 className="font-bold text-2xl text-gray-600">{data.name}</h1>
                    <SavePropertyButton initialSave={data.initialSave} />
                </div>
                <div className="flex justify-between mt-2">
                    <ListingProgressBar soldPercentage={data.soldPercentage} />
                    <PriceActions pricePerShare={listing.investData.pricePerBlock} />
                </div>
                <div className=''>
                    <Gallery initialImages={initialImages} />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-bold text-gray-600 text-xl pt-5">
                            {data.street}
                        </h2>
                        <h3 className="font-semi-bold text-gray-600 text-l py-2">
                            {data.city}, {data.state} {data.zipcode}
                        </h3>
                        <div className="text-midnight-blue pt-5">
                            <FontAwesomeIcon
                                icon={faUserGroup}
                                className="text-md cursor-pointer text-midnight-blue"
                            />
                            <span className="pl-5 pr-2 font-bold">
                                {formatCurrency(data.rent)}/per month
                            </span>{' '}
                            • <span className="px-2 text-gray-600">{data.type}</span>
                        </div>
                        <div className="text-midnight-blue pt-2 border-b border-gray-500 pb-10">
                            <FontAwesomeIcon
                                icon={faHouse}
                                className="text-md cursor-pointer text-midnight-blue"
                            />
                            <span className="px-2 text-gray-600">{data.lineSummary}</span>
                        </div>
                        <p className="py-10 text-gray-500">{data.paragraph}</p>
                        <AdditionalPropertyDetails additionalDetails={listing.additionalDetails} />
                        <LocationDetails locationDetails={listing.locationDetails} />
                        <MapBox
                            lng={data.lng}
                            lat={data.lat}
                            zoom={13}
                            addresses={addressCoordinates}
                            height={'300px'}
                            disablePopups={true}
                        />

                        {/* Pass the relevant data as props */}
                        <DeveloperInfo developerInfo={listing.developerInfo} />
                        <DividentInfo financialDetails={listing.financialDetails} />

                        <Documents documents={listing.documents} />
                        <Comments listingId={listing.id} />
                    </div>
                    <div className="pt-20">
                        <InvestCard investData={listing.investData} />
                        <OwnershipCard ownershipData={listing.ownershipData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Listing