import React, {useEffect, useState} from 'react';
import { Form, Icon, Block, Button, Container } from 'react-bulma-components';

import 'bulma/css/bulma.min.css';


const Profile = () => {
  
  // TODO: add a state variable that will store the user ID from the database
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');


  useEffect(() => {
    fetch('/api/user/first')
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData)
        setFirstName(jsonData.first_name)
        setLastName(jsonData.last_name)
        setEmail(jsonData.email)
        // TODO: set the user ID from the database
      })
  }, []) // run this once when the component is first rendered



  const handleClick = (evt) => {
    evt.preventDefault();

    const formInputs ={
      firstName: setFirstName(e.target.value),
      lastName: setLastName(e.target.value),
      email: setEmail(e.target.value),
    };

    // TODO: you'll need to use a template string to replace `<user_id>` with a variable
    fetch('/api/user/<user_id>', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
              onclick={handleClick}
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
              /*add the click handler prop to this button*/
            >
              Update
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Container>
  );  
};

export default Profile;