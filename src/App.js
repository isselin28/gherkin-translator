import "./App.css";

import React, { useState } from "react";

function App() {
  const [textValue, setTextValue] = useState("");
  const [copyData, setCopyData] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function handleInput(e) {
    setIsCopied(false);
    setTextValue(e.target.value);
  }

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
        const line = `await test.step('${testCase}', () => yourtest );`;
        return String(line);
      })
      .join("\r\n");
    setCopyData(copy);
    handleCopy(copy);
  }

  function handleCopy(data) {
    navigator.clipboard.writeText(data);
    setIsCopied(true);
  }

  function handleClear() {
    setTextValue("");
    setIsCopied(false);
  }

  const placeholderInput =
    "(example)\n\nGiven user has logged in And user add a cucumber to cart \n\nAnd user add another cucumber\nThen user add another cucumber again\n\nWhen User navigates to Cart page\n\nThen user see many cucumbers displayed";

  return (
    <>
      <div className="Flex">
        <div className="FlexColumn">
          <div className="Title">Translate Gherkin</div>
          <textarea
            onChange={handleInput}
            className="Textarea"
            value={textValue}
            placeholder={placeholderInput}
          />
          <div className="Flex">
            <button onClick={handleClear} className="ClearButton">
              clear
            </button>
            <button onClick={() => translator(textValue)} className="Button">
              submit & copy
            </button>
          </div>
        </div>
        <div className="FlexColumn">
          <div className="Title">Result</div>
          <textarea
            className="ResultBox"
            value={copyData}
            onChange={setCopyData}
            readOnly
          />
          {isCopied && (
            <div className="CopyFeedbackText">Copied to clipboard!</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
