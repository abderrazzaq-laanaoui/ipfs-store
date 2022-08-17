// a form modal for selecting a file, and inputing the name and the price

import React from "react";
import "./modal.css";
import { useState } from "react";

export const Modal = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");

  const onClose = () => {
    setName("");
    setSelectedFile(null);
    setPrice("");
    // hide the modal
    document.getElementById("file-input").value = ""
    document.querySelector(".modal").classList.add("hide");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    // accept only .svg files
    if (file.type !== "image/svg+xml") {
      // pop up a message to the user that the file is not an SVG
      alert("Please select an SVG file");
      return;
    }
    // get the contents of the file
    let reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    }
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedFile || !price) {
      alert("Please fill all fields");
      return;
    }
    onAdd({ name, price, image: selectedFile });
    setName("");
    setPrice("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="modal hide">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add new icon</h2>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
              Price:
              <input type="text" value={price} onChange={handlePriceChange} />
            </label>
            <label>
              Image:
              <button
                className="file-select"
                type="button"
                onClick={() => document.querySelector("#file-input").click()}
              >
                Select file
              </button>
              <input type="file" id="file-input" onChange={handleFileChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};
