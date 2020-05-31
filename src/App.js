import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Cats from './components/Cats';

import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [breeds, setBreeds] = useState([]);
	const [breedSelected, setBreedSelect] = useState("");
	const [catsList, setCatsList] = useState([]);

	const firstLoad = useRef(true);

	useEffect(() => {
		fetchBreeds();
	}, []);

	useEffect(() => {
		if (firstLoad.current) {
	    	firstLoad.current = false;
	    	return;
	    }
		fetchCats();
	}, [breedSelected]);


	const fetchBreeds = async () => {
		const res = await fetch('https://api.thecatapi.com/v1/breeds');
		const data = await res.json();

		setBreeds(data);
	}

	const fetchCats = async () => {
		const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=100&breed_id=${breedSelected}`);
		const data = await res.json();
		console.log(data);
		setCatsList(data);
	}

	const onBreedSelect = e => {
		setBreedSelect(e.target.value);
	}

  return (
  	<div className="home">
	    <Container>
	      	<h1>Cat Browser</h1>
		    <Row>
		      	<Col xs={12} sm={6} md={3}>
		      		<Form.Group controlId="formBreedSelect">
		      			<Form.Label>Breed</Form.Label>
		      			<Form.Control as="select" onChange={ onBreedSelect }>
		      			  	<option value>Select breed</option>
		      			  {breeds.map(item => (
		      			  	<option key={item.id} value={item.id}>{item.name}</option>
		      			  ))}
		      			</Form.Control>
				    </Form.Group>
			    </Col>
	     	</Row>
	     	<Row>
	     		{Array.isArray(catsList) && catsList.length === 0 ?
	     			 <Col xs={12}>No Cats Available</Col> :
		     		catsList.map(cat => (
		     			<Cats
		     				id = {cat.id}
		     				imageUrl = {cat.url}
		     			/>
		     		))
		     	}
	     	</Row>
	    </Container>
	  </div>
  );
}

export default App;
