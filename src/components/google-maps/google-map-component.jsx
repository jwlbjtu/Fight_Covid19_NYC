import React, { useState, useEffect } from 'react';
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap, 
    Marker,
    InfoWindow
} from 'react-google-maps';
import * as parkData from '../../data/skateboard-parks.json';
import mapStyles from './map-styles';

function Map() {

    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        let listener = e => {
            if(e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);
    }, []);

   return(
    <GoogleMap 
        defaultZoom={10}
        defaultCenter={{lat: 45.4211, lng: -75.6903}}
        defaultOptions={{styles: mapStyles}}
    >
        {
            parkData.features.map(park => (
                <Marker 
                    key={park.properties.PARK_ID} 
                    position={{
                        lat: park.geometry.coordinates[1],
                        lng: park.geometry.coordinates[0]
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}
                    icon={{
                        url: process.env.PUBLIC_URL + "/skateboarding.svg",
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            ))
        }

        {
            selectedPark && (
                <InfoWindow
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0]
                    }}
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )
        }

    </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;