import './App.css';
import { Header } from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import UserHistory from './components/UserHistory';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path= "/user/history" element={<UserHistory />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
