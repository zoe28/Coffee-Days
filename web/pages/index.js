import { Button, Container, Heading } from 'react-bulma-components';
import { GoogleMap, useLoadScript, InfoWindowF, MarkerF } from '@react-google-maps/api';

import 'bulma/css/bulma.min.css';
import styles from '../styles/index.module.css';

import { useMemo, useState } from 'react';


const Map = () => {

  const gmaps = window.google.maps;

  // create a state variable to store the list of results returned by the GMaps Places TextSearch API
  const [results, setResults] = useState([]);

  // create a state variable to control whether the InfoMarker (white pop-up with coffee shop name) is shown
  const [isInfoMarkerVisible, setIsInfoMarkerVisible] = useState(false);

  // create a state variable to control where the InfoMarker (white pop-up) is displayed
  const [infoMarkerLocation, setInfoMarkerLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [selectedResult, setSelectedResult] = useState();

  const onMapLoad = (map) => {
    const sanFrancisco = new gmaps.LatLng(37.763, -122.435);

    // construct the query/search that the GMaps API to return to me
    const request = {
      location: sanFrancisco,
      radius: 2000,
      query: "coffee"
    }

    // construct a "service" object that will help me make the request, 
    // PlacesService is a class that has methods to help me make requests to the google maps api
    const service = new gmaps.places.PlacesService(map);

    // this is similar to a `fetch()` call, also it's using a callback function instead of promises (.then().then())
    //                 query    callback function parameters
    service.textSearch(request, (results, status) => {

      // check if there were no errors with API call and check that `results` is defined, which means I have data back from the API
      if (status === gmaps.places.PlacesServiceStatus.OK && results) {
        // update the `results` state variable so that can use it to render markers
        setResults(results);

        console.log({ results });
      }
    });
  }

  const onMarkerClick = (mapMouseEvent, result) => {
    console.log(mapMouseEvent);
    // set `selectedResult` to the result that corresponds with the marker that I clicked on
    setSelectedResult(result);
    // update the InfoMarker (white pop-up) location to be close to the red marker I click
    setInfoMarkerLocation(mapMouseEvent.latLng);
    // update the state variable to make the InfoMarker visible
    setIsInfoMarkerVisible(true);

  };

  // temporary variable for where the map should start
  const center = useMemo(() => ({lat:37.763, lng:-122.435}), []);

  return (
    <
      GoogleMap zoom={13} 
      center={center} 
      mapContainerClassName={styles.mapContainer}
      // when the component has finished rendering, call onMapLoad()
      onLoad={onMapLoad}
    >
      {/* loop through the list of results (state variable) and render a marker for each one */}
      {results.map((result) => {
        console.log({ result });
        
        // create a temporary variable to store the geolocation (latitude, longitude) each this result
        const position = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };

        // create a temporary variable to check whether this result's `place_id` is the same as the result stored in the `selectedResult` state variable
        // if it is, it means this marker is the last one the user clicked on
        const isSelected = result.place_id === selectedResult?.place_id;

        return (
          <MarkerF 
            position={position}
            animation={isSelected && gmaps.Animation.BOUNCE}
            onClick={(event) => onMarkerClick(event, result)}
            icon={{
              url:'/coffee-marker.png',
              scaledSize: new window.google.maps.Size(55,55),
            }}
          />
        )
      })}

      {isInfoMarkerVisible && (
        <InfoWindowF
          // state variable updated on line 78
          position={infoMarkerLocation}
          // adjust the location so that it's 52 pixels higher than the coffee marker
          // this prevents it from blocking the marker
          options={{ pixelOffset: { height: -52 } }}
        >
          <>
            {/* the name of the selected coffee shop */}
            <h4>{selectedResult.name.split("-")[0]}</h4>
            {/* the rating of the selected coffee shop */}
            <div>Rating: {selectedResult.rating}</div>
          </>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

// create a functional component
const Index = () => {

  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  // show "Loading..." while GMaps JS is loading
  if (!isLoaded) return <div>Loading...</div>;

  return (
      <Container>
        <Heading className="is-1">Coffee Days</Heading>
        <Map />
      </Container>
  );
};

export default Index;