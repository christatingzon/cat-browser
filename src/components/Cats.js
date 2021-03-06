import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Cats({id, imageUrl}) {
  return (
    <Col xs={12} sm={6} md={3}>
    	<Card>
    	  	<Card.Img variant="top" src={imageUrl} />
    	  	<Card.Body>
    	  	  	<Button variant="primary" block as={Link} to={`${id}`}>View Details</Button>
    	  	</Card.Body>
    	</Card>
    </Col>
  );
}

export default Cats;
