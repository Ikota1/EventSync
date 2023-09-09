import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const EventLocation = ({ userLocation }) => {
    const [userDefLocation, setDefUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);


    const getUserLocation = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=AIzaSyArxnIuFJJezK4Zo99XnTJLy-wm1piTrBw`)
        const location = await response.json()
        setDefUserLocation(location.results[0].geometry.location)
        setLoading(false)
    }

    useEffect(() => {
        getUserLocation()
    }, [])


    if (loading) {
        return null
    }

    return (
        <div>
            <GoogleMap
                center={userDefLocation}
                zoom={14}
                mapContainerStyle={{ width: 'auto', height: '300px', borderRadius: "5px" }}>
                <Marker position={userDefLocation} />
            </GoogleMap>
        </div>
    );
};

export default EventLocation;