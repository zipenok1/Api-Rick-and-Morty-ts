
import './index.css';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import { CharacterProvider } from './context/CharacterContext';
import AppRouter from './component/AppRouter';

function App() {
  return (
    <CharacterProvider>
      <div>
        <NavBar/>
        <AppRouter/>
        <Footer/>
      </div>
    </CharacterProvider>
  );
}

export default App;