import './App.css';
import About from './components/About';
import Bottom from './components/Bottom';
import Menu from './components/Menu';
import Top from './components/Top';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <Top/>
      <Menu/>
      <Bottom/>
    </Container>
  );
}

export default App;
