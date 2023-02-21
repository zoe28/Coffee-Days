import {
  Button,
  Container,
  Form,
  Heading,
  Columns,
  Message,
} from "react-bulma-components";
import {
  GoogleMap,
  useLoadScript,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/map.module.css";

const Shop = () => {
  const gmaps = window.google.maps;
  const router = useRouter();
  const { place_id } = router.query;

  const [place, setPlace] = useState({});
  const [placeLocation, setPlaceLocation] = useState({ lat: 0, lng: 0 });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    /* 
    1. make a fetch call to GET the data from `/api/shop/<place_id>`
    2. if the response is null/undefined
    3. make a fetch call to POST the `place_id` to `/api/shop/<place_id>`
    4. this creates the shop in the database
     */

    fetch(`/api/shop/${place_id}`)
      .then((res) => res.json())
      .then((jsonData) => {
        // if the shop doesn't exist
        console.log(jsonData);

        if (!jsonData.shop_id) {
          // create the shop
          fetch(`/api/shop/${place_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((jsonData) => {
              console.log(jsonData);
            });
        } else {
          fetch(`/api/review/${place_id}`)
            .then((res) => res.json())
            .then((jsonData) => {
              console.log("review:", jsonData);
              setReviews(jsonData);
            });
        }
      });

    // later TODO: get a list of reviews for the shop
    /*
    fetch(`/api/review/${place_id}`)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        setReviews(jsonData.reviews);
      });
      */
  }, []); // run this once when the component is first rendered

  const handleMapLoad = (map) => {
    console.log({ map });
    const infoWindow = new gmaps.InfoWindow();
    const service = new gmaps.places.PlacesService(map);

    const request = {
      placeId: place_id,
      files: ["name", "formatted_address", "place_id", "geometry", "rating"],
    };

    service.getDetails(request, (place, status) => {
      console.log({ place, status });
      console.log(gmaps.places.PlacesServiceStatus.OK);

      if (status === gmaps.places.PlacesServiceStatus.OK && place) {
        const location = place.geometry.location;

        // make a fetch() to POST the place_id to /api/shop/<place_id>

        const placeId = place.geometry.id;
        const placeLatLng = { lat: location.lat(), lng: location.lng() };
        const ratings = place.geometry.rating;
        console.log({ placeLatLng });
        setPlace(place);
        setPlaceLocation(placeLatLng);
      }
    });
  };

  console.log({ reviews });

  return (
    <Container>
      <Heading>{place.name}</Heading>
      <Heading color="warning" subtitle>
        Rating: {place.rating}
      </Heading>
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
          {reviews.map((review) => {
            return (
              <Message color="warning">
                <Message.Header>
                  <span>Rating: {review.rating_score}</span>
                </Message.Header>
                <Message.Body>{review.comment}</Message.Body>
              </Message>
            );
          })}
          <form>
            <Form.Field>
              <Form.Control>
                <Link href={`/review/${place_id}`}>
                  <Button color="warning">Add a review </Button>
                </Link>
              </Form.Control>
            </Form.Field>
          </form>
        </Columns.Column>
      </Columns>
    </Container>
  );
};

export default Shop;
