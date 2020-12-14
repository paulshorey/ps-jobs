import React, { useState, useEffect } from "react"
import { SearchStyled } from "./Search.styled.js"

export default function ({ reFind = [], reExclude = "", reList = "new", onChange = () => {}, jobsFoundLength = 0 }) {
  /*
   * Local state updates when incoming props changes
   */
  const [inputList, set_inputList] = useState(reList)
  const [inputExclude, set_inputExclude] = useState(reExclude)
  const [inputFind, set_inputFind] = useState(reFind)
  useEffect(() => {
    set_inputList(reList)
    set_inputExclude(reExclude)
    set_inputFind(reFind)
  }, [reFind, reExclude])
  /*
   * User submit
   */
  const addFind = function () {
    reFind.push("")
    set_inputFind(reFind)
    saveEdits()
  }
  const removeFind = function () {
    reFind.pop()
    set_inputFind(reFind)
    saveEdits()
  }
  const editFind = function (i, value) {
    console.warn("editFind", i, value)
    reFind[i] = value
    set_inputFind(reFind)
  }
  const saveEdits = function (changes) {
    let toChange = {
      reList: typeof inputList !== "undefined" ? inputList : reList,
      reExclude: typeof inputExclude !== "undefined" ? inputExclude : reExclude,
      reFind: typeof inputFind !== "undefined" ? inputFind : reFind,
      ...changes
    }
    if (toChange.reExclude === reExclude && toChange.reFind === reFind && !toChange.reList) return
    onChange({ ...toChange })
  }
  /*
   * View
   */
  return (
    <SearchStyled className="Search">
      <div className="form">
        <div className="fieldset radio">
          {["new", "maybe", "ignore", "apply", "applied"].map((val) => (
            <span
              className="radioInput"
              onClick={() => {
                set_inputList(val)
                saveEdits({ reList: val })
              }}
            >
              <span className="radio">
                {inputList === val ? <span className="radioChecked" /> : <span className="radioUnchecked" />}
              </span>
              <label className="radioLabel">{val}</label>
            </span>
          ))}
        </div>
        <div className="fieldset text">
          <input
            placeholder="exclude keywords (regexp)"
            type="text"
            value={inputExclude}
            onChange={(event) => {
              set_inputExclude(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                saveEdits({ reExclude: inputExclude })
              }
            }}
            onBlur={() => {
              saveEdits({ reExclude: inputExclude })
            }}
          />
          <span className="button">exclude</span>
        </div>
        {/*
         * Find
         */}
        {inputFind.map((inputFind1, i) => (
          <div key={"find" + i}>
            <div className="fieldset text">
              <input
                placeholder="find keywords (regexp)"
                type="text"
                defaultValue={inputFind1}
                onChange={(event) => {
                  editFind(i, event.target.value)
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    saveEdits()
                  }
                }}
                onBlur={() => {
                  saveEdits()
                }}
              />
              <span className="button">find{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="found color-attention">
        <b className="add-remove-find">
          <span onClick={removeFind}>
            {" "}
            <b>&ndash;</b>{" "}
          </span>
          /
          <span onClick={addFind}>
            {" "}
            <b>+</b>{" "}
          </span>
        </b>
        <b>found {jobsFoundLength} results:</b>
      </div>
    </SearchStyled>
  )
}
