import React, { useState, useEffect } from "react"
import { SearchStyled } from "./Search.styled.js"

export default function ({
  reHighlight = "",
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
  const [inputHighlight, set_inputHighlight] = useState(reHighlight)
  useEffect(() => {
    set_inputList(reList)
    set_inputExclude(reExclude)
    set_inputHighlight(reHighlight)
  }, [reHighlight, reExclude])
  /*
   * User submit
   */
  const submitChanges = function (changedState) {
    let toChange = {
      reList: typeof changedState.reList !== "undefined" ? changedState.reList : reList,
      reExclude: typeof changedState.reExclude !== "undefined" ? changedState.reExclude : reExclude,
      reHighlight: typeof changedState.reHighlight !== "undefined" ? changedState.reHighlight : reHighlight
    }
    if (toChange.reExclude === reExclude && toChange.reHighlight === reHighlight && !toChange.reList) return
    onChange({ ...toChange })
  }
  /*
   * View
   */
  return (
    <SearchStyled className="Search">
      <div className="form">
        <div className="fieldset radio">
          {["new", "maybe", "ignore", "to apply", "applied"].map((val) => (
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
            type="text"
            value={inputHighlight}
            onChange={(event) => {
              set_inputHighlight(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submitChanges({ reHighlight: inputHighlight })
              }
            }}
            onBlur={() => {
              submitChanges({ reHighlight: inputHighlight })
            }}
          />
          <span className="button">find</span>
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
//       inputHighlight: props.inputHighlight || ""
//     }
//   }
//   render() {
//     const { reHighlight = "", onChange = () => {} } = this.props
//     return (
//       <fieldset>
//         <input
//           type="text"
//           value={inputHighlight}
//           onChange={(event) => {
//             this.setState({ inputHighlight: event.target.value })
//           }}
//         />
//         <button
//           type="button"
//           onClick={() => {
//             submitChanges({reHighlight:inputHighlight})
//           }}
//         >
//           find
//         </button>
//       </fieldset>
//     )
//   }
// }
