import { Button, Container, Heading } from 'react-bulma-components';
import TopNavbar from "../components/TopNavbar"

import 'bulma/css/bulma.min.css';

const Index = () => {
  return (
    <Container>
      <TopNavbar />
      <Heading>Coffee Days</Heading>
    </Container>
  );
};

export default Index;