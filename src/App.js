import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [inputColor, setInputColor] = useState("");
  const [allColors, setAllColors] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputColor && inputColor.charAt(0) === "#" && inputColor.length === 7) {
      const rgbDec = [
        parseInt(inputColor.slice(1, 3), 16),
        parseInt(inputColor.slice(3, 5), 16),
        parseInt(inputColor.slice(5), 16),
      ];
      let cAllColors = [{ id: uuidv4(), color: inputColor }];
      for (let i = 0.1; i <= 1; i += 0.1) {
        const rgbWhite = [];
        const rgbBlack = [];
        for (let j = 0; j < rgbDec.length; j++) {
          rgbWhite.push(
            Math.round(rgbDec[j] + (255 - rgbDec[j]) * i)
              .toString(16)
              .padStart(2, "0")
          );
          rgbBlack.push(
            Math.round(rgbDec[j] * (1 - i))
              .toString(16)
              .padStart(2, "0")
          );
        }
        const colorWhite = "#".concat(rgbWhite.join(""));
        const colorBlack = "#".concat(rgbBlack.join(""));
        cAllColors.push({ id: uuidv4(), color: colorBlack });
        cAllColors.unshift({ id: uuidv4(), color: colorWhite });
      }
      setAllColors(cAllColors);
    }
  };

  const copyClipboard = (color) => {
    navigator.clipboard.writeText(color.color);
    setCopied(true);
  };

  return (
    <section className="app">
      <form onSubmit={handleSubmit}>
        <label>Color Generator</label>
        <input
          type="text"
          id="color"
          name="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <h2>{copied && "Copied to clipboard"}</h2>
      <div className="grid-container">
        {allColors.map((color, i) => {
          return (
            <div
              key={color.id}
              className="grid"
              style={{ backgroundColor: color.color }}
              onClick={() => copyClipboard(color)}
            >
              <p>{Math.abs(100 - 10 * i)}%</p>
              <p>{color.color}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default App;
