import sofa from './assets/sofa.jpg';
import './App.css';
import Navbar from './components/Navbar';
import Store from './components/Store';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>
    <div className='container'>
      <img src={sofa} alt='sofa' />
      <Navbar />
      <Store />
    </div>
    </ShoppingCartProvider>
  );
}

export default App;
