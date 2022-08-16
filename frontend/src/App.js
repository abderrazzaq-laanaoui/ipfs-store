import { CardList } from "./components/CardList/card-list";
import { Scroll } from "./components/Scroll/scroll";
import { Modal } from "./components/Modal/modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/";


const App = () => {
  const [items, setItems] = useState([]);
  const [groupId, setGroupId] = useState(undefined);

  useEffect(() => {
    axios.get(API_URL).then(response => {

      setItems(response.data.items);
      setGroupId(response.data.groupId);
    })
      .catch(error => {
        console.log(error);
      });

  }, [])

  const getNextGroup = () => {
    console.log(groupId);
    axios.get(API_URL + (groupId - 1)).then(response => {

      setItems(items.concat(response.data));
      setGroupId(groupId - 1);
    }).catch(error => {
      console.log(error);
    }
    );
  }

  const onAdd = ({ name, price, image }) => {
    axios.post(API_URL, { name, price, image }).then(response => {
      console.log(response);
      setItems(items.concat(response.data));
    }).catch(error => {
      console.log(error);
    });

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
        {groupId > 0 ?
          <button className="load" onClick={getNextGroup}>Load more...</button>
          : null}
      </Scroll>
    </div>
  );
};

export default App;
