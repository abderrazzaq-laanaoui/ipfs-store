import React from "react";
import "./card.css";

export const Card = ({ item }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="card-content">
        <h3>{item.name}</h3>
        <p>{item.price}$</p>
        <button
          className="button"
          onClick={() => {
            console.log("Buy item: ", item.id);
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
