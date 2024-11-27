import { fetchUserHistory } from '../services/api.js';
import { useState, useEffect } from 'react';

export const UserHistory = () => {

  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getHistory = async () => {
          try {
              const data = await fetchUserHistory();
              setHistory(data);
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };

      getHistory();
  }, []);

  return (
    <div className="user-history">
            <h1>Historial de Artículos</h1>
            {error && <p>Error: {error}</p>}
                <ul>
                    {history.map((product) => (
                        <li key={product._id} className="history-product">
                            <div className="history-product-info">
                                <h2>{product.name}</h2>
                                <p>Categoría: {product.category}</p>
                                <p>Costo: {product.cost} puntos</p>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default UserHistory;