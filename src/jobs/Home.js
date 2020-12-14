import React from "react"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faArrowAltUp, faArrowAltDown, faHandPointLeft as faHandPointLeftSolid } from "@fortawesome/pro-solid-svg-icons"
import quotes from "./json/quotes.json"
import Quote from "../components/Quote"

export default function () {
  return (
    <div className="home">
      <div className="legend">
        <p className="color-attention">
          <b>
            <FA icon={faHandPointLeftSolid} className="x85" style={{ transform: "rotate(-45deg)" }} /> Use Regular
            Expressions to exclude/find results.
          </b>{" "}
          NOTE: "find2" is case-sensitive! Other fields are not. Be careful with spaces! To match the programming
          language "C", enter " c " or "[^\w\d]c[^\w\d]". Simply "c" will match the letter in every word.
        </p>
        <h2 className="color-attention">
          Use keyboard arrows <FA icon={faArrowAltUp} /> /
          <FA icon={faArrowAltDown} /> to flip through jobs.
        </h2>
      </div>
      <div className="quotes">
        <h2>Motivational quotes from freecodecamp.org:</h2>
        {quotes.map((quo, i) => (quo ? <Quote key={i} quo={quo} /> : null))}
      </div>
    </div>
  )
}
