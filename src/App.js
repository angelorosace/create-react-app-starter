import logo from './logo.png';
import './App.css';

import Footer from './Components/Footer/Footer';
import Searchbar from './Components/Searchbar/Searchbar';

function App() {
  return (
    <div className="App">
      <Searchbar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Anidex. A pokedex-like application for nature lovers</p>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
