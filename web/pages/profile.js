import React, {useEffect, useState} from 'react';
import TopNavbar from "../components/TopNavbar"
import { Form, Icon, Block, Button, Container } from 'react-bulma-components';

import 'bulma/css/bulma.min.css';


const Profile = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');


  useEffect(() => {
    fetch('/api/user/first')
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData)
        // const {first_name, last_name, email} = jsonData; // destructuring
        setFirstName(jsonData.first_name)
        setLastName(jsonData.last_name)
        setEmail(jsonData.email)
      })
  }, []) // run this once when the component is first rendered



  const handleClick = (evt) => {
    evt.preventDefault();
    const formInputs ={
      firstName: setFirstName(e.target.value),
      lastName: setLastName(e.target.value),
      email: setEmail(e.target.value),
    };

    fetch('/api/user/<user_id>', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(Profile);
    
  };

  return (
    <Container>
      <TopNavbar />
      <form>
        <Form.Field>
          <Form.Label>First name</Form.Label>
            <Form.Input
              value={firstName}
              //onChange={(e) => {
                //return setFirstName(e.target.value);
              onclick={handleClick} 
              //}}
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
          {/*
              call the click handler to make the POST request
          */}
          <Form.Control>
            <Button color="warning">Update</Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Container>
  );  
};

export default Profile;