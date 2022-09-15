
import { Button, Container, Heading } from 'react-bulma-components';
import TopNavbar from "../components/TopNavbar"

import 'bulma/css/bulma.min.css';

// create a functional component
const Reviews = () => {
  return (
    <Container>
      <TopNavbar />
      <Heading>Reviews</Heading>
    </Container>
  );
};

export default Reviews;