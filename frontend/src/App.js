import "./App.css";
import { CardList } from "./components/CardList/card-list";
import { Modal } from "./components/Modal/modal";
import { Scroll } from "./components/Scroll/scroll";

const items = [
  { id: 1, name: "SVG ITEM 1", price: 10, image: "./images/item.svg" },
  { id: 2, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 3, name: "SVG 3", price: 8, image: "./images/item.svg" },
  { id: 4, name: "SVG 4", price: 8, image: "./images/item.svg" },
  { id: 5, name: "SVG 5", price: 8, image: "./images/item.svg" },
  { id: 6, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 7, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 8, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 9, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 10, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 11, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 12, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 14, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 15, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 16, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 17, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 18, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 19, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 20, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 21, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 22, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 23, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 24, name: "SVG 2", price: 8, image: "./images/item.svg" },
  { id: 25, name: "SVG 2", price: 8, image: "./images/item.svg" },
];
const App = () => {
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
