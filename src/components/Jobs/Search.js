import React, { useState, useEffect } from "react"
import { SearchStyled } from "./Search.styled.js"

export default function ({
  reFind1 = "",
  reFind2 = "",
  reExclude = "",
  reList = "new",
  onChange = () => {},
  jobsFoundLength = 0
}) {
  /*
   * Local state updates when incoming props changes
   */
  const [inputList, set_inputList] = useState(reList)
  const [inputExclude, set_inputExclude] = useState(reExclude)
  const [inputFind1, set_inputFind1] = useState(reFind1)
  const [inputFind2, set_inputFind2] = useState(reFind2)
  useEffect(() => {
    set_inputList(reList)
    set_inputExclude(reExclude)
    set_inputFind1(reFind1)
    set_inputFind2(reFind2)
  }, [reFind1, reExclude])
  /*
   * User submit
   */
  const submitChanges = function (changedState) {
    let toChange = {
      reList: typeof changedState.reList !== "undefined" ? changedState.reList : reList,
      reExclude: typeof changedState.reExclude !== "undefined" ? changedState.reExclude : reExclude,
      reFind1: typeof changedState.reFind1 !== "undefined" ? changedState.reFind1 : reFind1,
      reFind2: typeof changedState.reFind2 !== "undefined" ? changedState.reFind2 : reFind2
    }
    if (toChange.reExclude === reExclude && toChange.reFind1 === reFind1 && !toChange.reList) return
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
                submitChanges({ reList: val })
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
            placeholder="case-insensitive regexp"
            type="text"
            value={inputExclude}
            onChange={(event) => {
              set_inputExclude(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submitChanges({ reExclude: inputExclude })
              }
            }}
            onBlur={() => {
              submitChanges({ reExclude: inputExclude })
            }}
          />
          <span className="button">exclude</span>
        </div>
        <div className="fieldset text">
          <input
            placeholder="case-insensitive regexp search"
            type="text"
            value={inputFind1}
            onChange={(event) => {
              set_inputFind1(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submitChanges({ reFind1: inputFind1 })
              }
            }}
            onBlur={() => {
              submitChanges({ reFind1: inputFind1 })
            }}
          />
          <span className="button">find1</span>
        </div>
        <div className="fieldset text">
          <input
            placeholder="Case-Sensitive RegExp Search"
            type="text"
            value={inputFind2}
            onChange={(event) => {
              set_inputFind2(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submitChanges({ reFind2: inputFind2 })
              }
            }}
            onBlur={() => {
              submitChanges({ reFind2: inputFind2 })
            }}
          />
          <span className="button">find2</span>
        </div>
      </div>
      <div className="found color-attention">
        <b>found {jobsFoundLength} results:</b>
      </div>
    </SearchStyled>
  )
}

// import React, { useState } from "react"
//
// export default class Links extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       inputFind1: props.inputFind1 || ""
//     }
//   }
//   render() {
//     const { reFind1 = "", onChange = () => {} } = this.props
//     return (
//       <fieldset>
//         <input
//           type="text"
//           value={inputFind1}
//           onChange={(event) => {
//             this.setState({ inputFind1: event.target.value })
//           }}
//         />
//         <button
//           type="button"
//           onClick={() => {
//             submitChanges({reFind1:inputFind1})
//           }}
//         >
//           find
//         </button>
//       </fieldset>
//     )
//   }
// }
