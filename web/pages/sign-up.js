import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Heading } from 'react-bulma-components';

import 'bulma/css/bulma.min.css';


const SignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');

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

        <Form.Control>
            <Button
              color="warning"
              /*add the click handler prop to this button*/
            >
              Sign Up
            </Button>
          </Form.Control>

      </form>
    </Container>
  );
};

export default SignUp;