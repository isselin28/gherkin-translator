import "./App.css";

import React, { useState } from "react";

function App() {
  const [textValue, setTextValue] = useState("");
  const [result, setResult] = useState("");
  function translator(text) {
    const cleanText = text.replace(/\n|\r/g, " ");
    const parsedText = cleanText.split(" ");

    console.log("parsedText", parsedText);

    const splitter = ["When", "Then", "And", "Given"];
    let testCases = [];

    let pointer = 0;
    let sentenceArr = [];
    for (let i = 1; i < parsedText.length; i++) {
      const gherkin = splitter.includes(parsedText[i]);
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

    const scenario = testCases.map((testCase) => {
      const line = `await test.step('${testCase}', () => // your test is here );`;

      return (
        <div>
          {line}
          <br />
        </div>
      );
    });

    setResult(scenario);
  }

  function handleCopy() {
    return navigator.clipboard.writeText(result);
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
          <div className="ResultBox">{result}</div>
          <button className="CopyButton" onClick={handleCopy}>
            copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
