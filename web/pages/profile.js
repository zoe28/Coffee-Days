import React, {useState} from 'react';
import TopNavbar from "../components/TopNavbar"
import { Form, Icon, Block, Button, Container } from 'react-bulma-components';


import 'bulma/css/bulma.min.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tocAgreed, setTocAgreed] = useState(false);
  const [questionValue, setQuestionValue] = useState('');

  return (
    <Container>
    <TopNavbar />
    
    <form>
      <Form.Field>
        <Form.Label>First name</Form.Label>
          <Form.Input
            value={username}
            onChange={(e) => {
              return setUsername(e.target.value);
            }}
          />
      </Form.Field>


      <Form.Field>
        <Form.Label>Last name</Form.Label>
          <Form.Input
            value={username}
            onChange={(e) => {
              return setUsername(e.target.value);
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
          <Button color="warning">Submit</Button>
        </Form.Control>
        <Form.Control>
          <Button color="link" colorVariant="light">
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
    </Container>
  );  
};

export default Profile;