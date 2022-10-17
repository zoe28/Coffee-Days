import React, { useEffect, useState } from "react";
import { Form, Icon, Block, Button, Container } from "react-bulma-components";
import { getCurrentUser } from "../lib/auth.js";

import "bulma/css/bulma.min.css";
import { useRouter } from "next/router.js";

const Profile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(getCurrentUser());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/${userId}`)
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          setUserId(jsonData.id);
          setFirstName(jsonData.first_name);
          setLastName(jsonData.last_name);
          setEmail(jsonData.email);
        });
    }
  }, []); // run this once when the component is first rendered

  const handleUpdateClick = (evt) => {
    evt.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    fetch(`/api/user/${userId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleLogOutClick = (evt) => {
    evt.preventDefault();

    localStorage.removeItem("user_id");
    router.push("/");
  };

  return (
    <Container>
      <form>
        <Form.Field>
          <Form.Label>First name</Form.Label>
          <Form.Input
            value={firstName}
            onChange={(e) => {
              return setFirstName(e.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Last name</Form.Label>
          <Form.Input
            value={lastName}
            onChange={(e) => {
              return setLastName(e.target.value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Input
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value);
            }}
          />
        </Form.Field>

        <Form.Field kind="group">
          <Form.Control>
            <Button
              color="warning"
              onClick={(evt) => {
                return handleUpdateClick(evt);
              }}
            >
              Update
            </Button>
          </Form.Control>

          <Form.Control>
            <Button
              onClick={(evt) => {
                return handleLogOutClick(evt);
              }}
            >
              Log out
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Container>
  );
};

export default Profile;
