import React from 'react';
import Main from '../components/Main';
import Row from '../components/Row'; // Ensure the Row component is imported
import requests from '../Request'; // Import the requests object for API endpoints

function Home() {
  return (
    <>
      <Main />

      <Row title='Top Rated' fetchUrl={requests.requestTopRated} />
      <Row title='Action Movies' fetchUrl={requests.requestActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.requestComedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.requestHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.requestRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.requestDocumentaries} />
      <Row title='Upcoming Movies' fetchUrl={requests.requestUpcoming} /> 
    </>
  );
}

export default Home;
