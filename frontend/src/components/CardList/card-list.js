import React from "react";
import "./card-list.css";

import { Card } from "../Card/card";

export const CardList = ({ items }) => (
  <div className="card-list">
    {items.map((item) => (
      <Card key={item.id} item={item} />
    ))}
  </div>
);
