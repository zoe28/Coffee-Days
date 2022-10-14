import { Button, Container, Form, Icon, Heading } from "react-bulma-components";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import "bulma/css/bulma.min.css";

const Review = () => {
  const router = useRouter();
  const { place_id } = router.query;

  // hardcode a `user_id`

  const [ratingScore, setRatingScore] = useState("1");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [shopId, setShopId] = useState("");

  const handleClick = (evt) => {
    evt.preventDefault();

    const body = {
      rating_score: ratingScore,
      comment: comment,
      user_id: userId,
      shop_id: shopId,
    };

    fetch(`/api/review/${place_id}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Review created!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.back();
      });
  };

  return (
    <Container>
      <Heading> Add a review: {place_id}</Heading>
      <form>
        <Form.Field>
          <Form.Label>Select your rating</Form.Label>
          <Form.Control>
            <Form.Select
              value={ratingScore}
              onChange={(e) => {
                return setRatingScore(e.target.value);
              }}
            >
              <option value="1">⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            </Form.Select>
            <Icon align="left">
              <i className="fas fa-globe" />
            </Icon>
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Share your experience to help others</Form.Label>
          <Form.Control>
            <Form.Textarea
              placeholder="Share your experience to help others"
              value={comment}
              onChange={(e) => {
                return setComment(e.target.value);
              }}
            />
          </Form.Control>
        </Form.Field>

        <Form.Control>
          <Button
            color="warning"
            onClick={(evt) => {
              return handleClick(evt);
            }}
          >
            Submit
          </Button>
        </Form.Control>
      </form>
    </Container>
  );
};

export default Review;
