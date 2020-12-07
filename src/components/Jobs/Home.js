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
          <br /> <i>Data is currently static,</i> manually crawled from Indeed, Stackoverflow, LinkedIn, Lever,
          Greenhouse, and Workable.
        </p>
        <p>
          What's unique about this? The powerful search. Also, results are aggregated into one list (JS Object /
          dictionary), so each job listing is unique (key = title + employer), even if it appears multiple times or in
          multiple sources. Click "ignore", "maybe", or "apply", to categorize the article. It will persist in your
          browser even if the site data or sources are updated, until you clear your cache.
        </p>
        <p>
          The{" "}
          <a href="https://wordio.co/word?str=boon" target="_blank">
            boon
          </a>{" "}
          of this invention is also it's also it's{" "}
          <a href="https://wordio.co/word?str=bane" target="_blank">
            bane
          </a>
          . The entire content is downloaded to the browser (front-end, 8MB). So, searching/browsing is very robust.
          However, it is slow and not scalable. This interface would probably have more use 1. without the keyword
          highlighting in the left nav items and 2. with data being served from an API, from an ElasticSearch database.
        </p>
        <p className="color-attention">
          <b>
            <FA icon={faHandPointLeftSolid} className="x85" style={{ transform: "rotate(45deg)" }} /> Use Regular
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
