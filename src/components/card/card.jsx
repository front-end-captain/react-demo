import React from "react";
import { fabric } from "fabric";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.canvasWidth = window.innerWidth < 415 ? window.innerWidth - 20 : 395;
    this.canvasHeight = this.canvasWidth * 540 / 855;
  }

  componentDidMount() {
    this.card = new fabric.Canvas(this.canvasElm, {
      backgroundColor: "white",
      preserveObjectStacking: false,
      selection: false,
    });

    this.card.setWidth(this.canvasWidth);
    this.card.setHeight(this.canvasHeight);

    this.addCardEventListener(this.card);
  }

  addCardEventListener = (card) => {
    card.on("object:added", () => {
      console.log("object added");
      // TODO update canvas state
    });

    card.on("object:modified", () => {
      console.log("object modified");
      // TODO update canvas state
    });

    card.on("object:removed", () => {
      console.log("object removed");
      // TODO update canvas state
    });

    card.on("selection:created", () => {
      console.log("selection created");
      // TODO: setSelectedObject to store
    });

    card.on("selection:updated", () => {
      console.log("selection updated");
      // TODO: setSelectedObject to store
    });

    card.on("selection:cleared", () => {
      console.log("selection cleared");
      // TODO: setSelectedObject to store
    });
  };

  render() {
    return <canvas ref={(node) => this.canvasElm = node} />;
  }
}

export default Card;

