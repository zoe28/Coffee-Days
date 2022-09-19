import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Heading } from 'react-bulma-components';

import 'bulma/css/bulma.min.css';


const SignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');


  const handleClick = (evt) => {
    evt.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        alert("User created!")
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
  };



  return (
    <Container>
      <Heading>Sign Up</Heading>
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

        
        <Button
            color="warning"
            onClick={(evt) => {
              return handleClick(evt);
            }}
          >
            Sign Up
        </Button>
       

      </form>
    </Container>
  );
};

export default SignUp;