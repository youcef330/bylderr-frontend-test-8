import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_TOKEN;

const MapBox = ({
    lng = -100,
    lat = 38.5,
    zoom = 3,
    addresses = [],
    height = '600px',
    disablePopups = false
}) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom,
            });
            mapRef.current.addControl(new mapboxgl.NavigationControl());
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: zoom,
                essential: true,
            });
        }
    }, [lng, lat, zoom]);

    useEffect(() => {
        if (!mapRef.current) return;

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        addresses.forEach(({
            lng,
            lat,
            id,
            title,
            location,
            roi,
            estimate,
            investment,
            imgSrc
        }) => {
            const listingUrl = `/listings/${id}`;

            const marker = new mapboxgl.Marker({ color: '#ff6347' })
                .setLngLat([lng, lat])
                .addTo(mapRef.current);

            marker.getElement().addEventListener('click', () => {
                mapRef.current.flyTo({
                    center: [lng, lat],
                    zoom: 10,
                    essential: true,
                });
            });

            if (!disablePopups) {
                const popupHTML = `
          <div style="
            display: flex; 
            flex-direction: column; 
            max-width: 220px;
            background: #fff; 
            border: 1px solid #ccc; 
            border-radius: 6px; 
            overflow: hidden; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            font-family: sans-serif;
          ">
            <div style="
              display: flex; 
              flex-direction: row; 
              align-items: center; 
              padding: 8px;
              border-bottom: 1px solid #eee;
            ">
              <img 
                src="${imgSrc}" 
                alt="${title}" 
                style="
                  width: 60px; 
                  height: 60px; 
                  object-fit: cover; 
                  border-radius: 4px; 
                  margin-right: 8px;
                "
              />
              <h3 style="
                margin: 0; 
                font-size: 14px; 
                color: #0077BE;
              ">
                ${title}
              </h3>
            </div>

            <div style="
              padding: 8px; 
              font-size: 12px; 
              line-height: 1.4; 
              color: #333;
            ">
              <p style="margin: 0 0 4px;">
                <strong>Location:</strong> ${location}
              </p>
              <p style="margin: 0 0 4px;">
                <strong>Estimate:</strong> $${Number(estimate).toLocaleString()}
              </p>
              <p style="margin: 0 0 4px;">
                <strong>ROI:</strong> ${roi}%
              </p>
              <p style="margin: 0 0 8px;">
                <strong>Investment:</strong> $${investment}
              </p>

              <a 
                href="${listingUrl}" 
                data-listing-id="${id}"
                style="
                  display: inline-block; 
                  padding: 6px 10px; 
                  background: #09005c; 
                  color: #fff; 
                  border-radius: 4px; 
                  text-decoration: none; 
                  font-weight: bold;
                "
              >
                View Listing
              </a>
            </div>
          </div>
        `;

                const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(popupHTML);

                marker.setPopup(popup);

                popup.on('open', () => {
                    const popupEl = popup.getElement();
                    if (!popupEl) return;

                    const link = popupEl.querySelector(`a[data-listing-id="${id}"]`);
                    if (link) {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            navigate(listingUrl);
                        });
                    }
                });
            }

            markersRef.current.push(marker);
        });
    }, [addresses, navigate, disablePopups]);

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height }} />
    );
};

export default MapBox;