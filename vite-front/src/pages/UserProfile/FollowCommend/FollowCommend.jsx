import React from "react";
import './FollowCommend.css'

export const FollowCommend = () => {
  const orders = [
    {
      id: 1,
      productName: "Article 1",
      date: "2023-06-15",
      price: 19.99,
      delivered: true,
    },
    {
      id: 2,
      productName: "Article 2",
      date: "2023-06-18",
      price: 24.99,
      delivered: false,
    },
    {
      id: 3,
      productName: "Article 3",
      date: "2023-06-20",
      price: 14.99,
      delivered: true,
    },
    // Ajoutez d'autres commandes ici
  ];

  return (
    <div  className="follow-command">
      <h2>Suivi des commandes</h2>
      <table>
        <thead>
          <tr>
            <th>Nom de l'article</th>
            <th>Date de la commande</th>
            <th>Prix de la commande</th>
            <th>Livré</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>{order.price}</td>
              <td>{order.delivered ? "Livré" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
