import { Button, Container, Heading } from 'react-bulma-components';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import 'bulma/css/bulma.min.css';
import styles from '../styles/index.module.css';
import { useMemo } from 'react';


// create a functional component
const Index = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  if (!isLoaded) return <div>Loading...</div>;


  return (
      <Container>
        <Heading className="is-1">Coffee Days</Heading>
        <Map />
      </Container>
  );
};

function Map() {
  const center = useMemo(() => ({lat:37.763, lng:-122.435}), []);
  return <
    GoogleMap zoom={13} 
    center={center} 
    mapContainerClassName={styles.mapContainer}
  >
  <Marker position={center}/>
  </GoogleMap>
}

export default Index;