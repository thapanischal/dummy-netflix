import './App.css';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Row from './Components/Row';
import requests from './request';


function App() {


  return (
    <div className="App">
      <Banner />
      <Navbar />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchTrending}
        isLargeRow />
      <Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row title="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY MOVIES" fetchUrl={requests.fetchComedyMovies} />
      <Row title="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies} />
      <Footer />
    </div>
  );
}

export default App;
