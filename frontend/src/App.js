import { CardList } from "./components/CardList/card-list";
import { Scroll } from "./components/Scroll/scroll";
import { Modal } from "./components/Modal/modal.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/";


const App = () => {
  const [items, setItems] = useState([]);
  const [groupId, setGroupId] = useState(0);

  useEffect(() => {
    axios.get(API_URL).then(response => {

      setItems(response.data.items);
      setGroupId(response.data.groupId);
    })
      .catch(error => {
        console.log(error);
      });

  })

  const onAdd = ({ name, price, image }) => {
    items.push({ id: items.length + 1, name, price, image });
  };

  const showModal = () => {
    document.querySelector(".modal").classList.remove("hide");
  };
  return (
    <div className="App">
      <div className="header">
        <h1 className="App-logo">SVGs Store</h1>
      </div>
      <Modal onAdd={onAdd} />
      <button className="sell-icon" onClick={showModal}>
        Sell icon
      </button>
      <Scroll>
        <CardList items={items} />
        <button className="load">Load more...</button>
      </Scroll>
    </div>
  );
};

export default App;
