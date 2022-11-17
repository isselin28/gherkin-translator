import "./App.css";

import React, { useState } from "react";

function App() {
  const [textValue, setTextValue] = useState("");
  const [copyData, setCopyData] = useState("");
  function translator(text) {
    const cleanText = text.replace(/\n|\r/g, " ");
    const parsedText = cleanText.split(" ");

    const splitter = ["When", "Then", "And", "Given"];
    let testCases = [];

    let pointer = 0;
    let sentenceArr = [];
    for (let i = 1; i < parsedText.length; i++) {
      const gherkin = splitter.includes(parsedText[i]);

      if (parsedText[i] === "") {
        continue;
      }

      if (!gherkin && pointer !== i) {
        sentenceArr.push(parsedText[i]);
      }

      if (gherkin || i === parsedText.length - 1) {
        pointer = i;
        let sentence = sentenceArr.join(" ");
        testCases.push(sentence);
        sentenceArr = [];
      }
    }

    const copy = testCases
      .map((testCase) => {
        const line = `await test.step('${testCase}', () => // your test is here );`;
        return String(line);
      })
      .join("\r\n");
    setCopyData(copy);
  }

  function handleCopy() {
    return navigator.clipboard.writeText(copyData);
  }

  return (
    <>
      <div className="Flex">
        <div className="FlexColumn">
          <div className="Title">Translate Gherkin</div>
          <textarea
            onChange={(e) => setTextValue(e.target.value)}
            className="Textarea"
            value={textValue}
          />
          <div className="Flex">
            <button onClick={() => setTextValue("")} className="ClearButton">
              clear
            </button>
            <button onClick={() => translator(textValue)} className="Button">
              submit
            </button>
          </div>
        </div>
        <div className="FlexColumn">
          <div className="Title">Result</div>
          <textarea
            className="ResultBox"
            value={copyData}
            onChange={setCopyData}
          />
          <button className="CopyButton" onClick={handleCopy}>
            copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
