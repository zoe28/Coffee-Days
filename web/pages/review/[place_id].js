import { Button, Container, Form, Icon, Heading } from "react-bulma-components";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import "bulma/css/bulma.min.css";

const Review = () => {
  const router = useRouter();
  const { place_id } = router.query;

  // TODO: add a click handler function to POST form data to /api/review/<place_id>
  // similar to sign-up.js
  // remember to hardcode a `user_id`

  return (
    <Container>
      <Heading> Add a review: {place_id}</Heading>
      <form>
        <Form.Field>
          <Form.Label>Select your rating</Form.Label>
          <Form.Control>
            <Form.Select>
              <option>⭐️</option>
              <option>⭐️⭐️</option>
              <option>⭐️⭐️⭐️</option>
              <option>⭐️⭐️⭐️⭐️</option>
              <option>⭐️⭐️⭐️⭐️⭐️</option>
            </Form.Select>
            <Icon align="left">
              <i className="fas fa-globe" />
            </Icon>
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Share your experience to help others</Form.Label>
          <Form.Control>
            <Form.Textarea placeholder="Share your experience to help others" />
          </Form.Control>
        </Form.Field>

        <Form.Control>
          {/* TODO: call the click handler */}
          <Button color="warning">Submit</Button>
        </Form.Control>
      </form>
    </Container>
  );
};

export default Review;
