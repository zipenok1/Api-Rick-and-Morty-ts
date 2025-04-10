import './index.css';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import AppRouter from './component/AppRouter';

function App() {
  return (
      <div>
        <NavBar/>
        <AppRouter/>
        <Footer/>
      </div>
  );
}

export default App;