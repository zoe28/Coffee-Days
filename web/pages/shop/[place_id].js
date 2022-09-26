import { Button, Container, Heading, Columns } from "react-bulma-components";
import {
  GoogleMap,
  useLoadScript,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/map.module.css";

const Shop = () => {
  const gmaps = window.google.maps;
  const router = useRouter();
  const { place_id } = router.query;

  const [place, setPlace] = useState({});
  const [placeLocation, setPlaceLocation] = useState({ lat: 0, lng: 0 });

  const handleMapLoad = (map) => {
    console.log({ map });
    const infoWindow = new gmaps.InfoWindow();
    const service = new gmaps.places.PlacesService(map);

    const request = {
      placeId: "ChIJSy28upiAhYARkoxpzFnW7b4",
      files: ["name", "formatted_address", "place_id", "geometry"],
    };

    service.getDetails(request, (place, status) => {
      console.log({ place, status });
      console.log(gmaps.places.PlacesServiceStatus.OK);
      if (status === gmaps.places.PlacesServiceStatus.OK && place) {
        const location = place.geometry.location;
        const placeLatLng = { lat: location.lat(), lng: location.lng() };
        console.log({ placeLatLng });
        setPlace(place);
        setPlaceLocation(placeLatLng);
      }
    });
  };

  return (
    <Container>
      <Heading>{place.name}</Heading>
      <Heading
        subtitle
        dangerouslySetInnerHTML={{ __html: place.adr_address }}
      />
      <Columns>
        <Columns.Column>
          <GoogleMap
            zoom={13}
            center={placeLocation}
            mapContainerClassName={styles.mapContainer}
            // when the component has finished rendering, call handleMapLoad()
            onLoad={handleMapLoad}
          >
            <MarkerF
              position={placeLocation}
              icon={{
                url: "/coffee-marker.png",
                scaledSize: new window.google.maps.Size(55, 55),
              }}
            />
          </GoogleMap>
        </Columns.Column>
        <Columns.Column>
          <Heading subtitle>Reviews</Heading>
        </Columns.Column>
      </Columns>
    </Container>
  );
};

export default Shop;
