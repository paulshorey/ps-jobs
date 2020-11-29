import React from "react"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faArrowAltUp, faArrowAltDown, faHandPointLeft as faHandPointLeftSolid } from "@fortawesome/pro-solid-svg-icons"
import quotes from "./json/quotes.json"
import Quote from "../Quotes/Quote"

export default function () {
  return (
    <div className="home">
      <div className="legend">
        <h3>This is a proof of concept</h3>
        <p>
          <b>
            Built with React. This codebase can be easily adapted to any type of content - blogs, news, or research
            articles.
          </b>
          <br /> <i>Data is currently static.</i> Was crawled from Indeed, Stackoverflow, LinkedIn, Lever, Greenhouse,
          and Workable.
        </p>
        <p>
          What's unique about this? The powerful search. Also, results are aggregated into one list (JS Object /
          dictionary), and each job listing is unique (key = title + employer), even if it appears multiple times or in
          multiple sources. Click "ignore", "maybe", or "apply", to categorize the article. The content will be saved in
          your account (currently in browser session).
        </p>
        <p>
          The boon of this invention is also it's also it's bane
        </p>
        <p className="color-attention">
          <b>
            <FA icon={faHandPointLeftSolid} className="x85" style={{ transform: "rotate(45deg)" }} /> Use Regular
            Expressions to exclude/find results.
          </b>{" "}
          NOTE: "find2" is case-sensitive! Other fields are not. Be careful with spaces! To search for the programming
          language "C", enter " c " or "[^\w\d]c[^\w\d]". Simply "c" will match the letter inside almost every word.
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
