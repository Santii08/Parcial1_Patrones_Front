import { useEffect, useState } from "react";

interface Order {
  id: number;
  item: string;
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error cargando pedidos:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📦 Pedidos</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos disponibles</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
