import React from "react"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faArrowAltUp, faArrowAltDown, faHandPointLeft as faHandPointLeftSolid } from "@fortawesome/pro-solid-svg-icons"
// import quotes from "./json/quotes.json"
// import Quote from "../components/Quote"

export default function () {
  return (
    <div className="home">
      <div className="legend">
        <p>&nbsp;</p>
        <p className="color-attention">
          <b>
            <FA icon={faHandPointLeftSolid} className="x85" style={{ transform: "rotate(-45deg)" }} /> Use Regular
            Expressions to exclude/find results.
          </b>{" "}
          For example, to find jobs mentioning the state of Colorado, use <code>CO[^\w]|Colorado[^\w]</code>
        </p>
        <ol>
          <li>
            <b>Case sensitivity. </b>If any of the characters are uppercase, search will be "case-sensitive". Use "CO"
            for the state, not "co".
          </li>
          <li>
            <b>Spaces matter. </b>To match the programming language "C", enter " c " or "[^\w\d]c[^\w\d]". Simply "c"
            will match the letter in every word.
          </li>
        </ol>
        <p>&nbsp;</p>
        <h2 className="color-attention">
          <FA icon={faArrowAltUp} />
          <FA icon={faArrowAltDown} /> Use keyboard arrows to flip through jobs.
        </h2>
      </div>
      {/*<div className="quotes">*/}
      {/*  <h2>Some motivational quotes from freecodecamp.org:</h2>*/}
      {/*  {quotes.map((quo, i) => (quo ? <Quote key={i} quo={quo} /> : null))}*/}
      {/*</div>*/}
    </div>
  )
}
