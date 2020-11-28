import React, { useState, useEffect } from "react"
import { JobFullStyled } from "./JobFull.styled.js"
function set_ss(key, value) {
  if (typeof window === "object") {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }
}

// export default class Jobs extends React.Component {
//   constructor(props) {
//   }
//   render(){}
export default function ({ job = {} }) {
  /*
   * State
   */
  const [renderJob, set_renderJob] = useState({})
  const do_putInList = function (list) {
    //
    // prepare
    let saveJob = { ...renderJob }
    delete saveJob.prev_job
    delete saveJob.next_job
    saveJob.list = list
    renderJob.list = list
    // save
    set_ss(saveJob.uid, saveJob)
    //
    // state
    set_renderJob(saveJob)
  }
  useEffect(() => {
    if (job && job.title) {
      set_renderJob({ ...job })
    }
  }, [job])
  console.log("renderJob.list vs. job.list", [renderJob.list, "vs.", renderJob.list])
  /*
   * View
   */
  if (!renderJob.body) return null
  let mentions = renderJob.mentions || []
  let random = Math.round(Math.random() * 1000000)
  return (
    <JobFullStyled>
      <div className="mentions">
        {/*
         * TOP LINKS - LIKE/HIDE
         */}
        <div className="topLinks">
          {/*
           *
           * FORM - SAVE, IGNORE, APPLY, NEW
           *
           */}
          <div className="fieldset radio">
            {/*
             * apply
             */}
            <span
              className="radioInput"
              onClick={() => {
                do_putInList("applied")
              }}
            >
              {renderJob.list === "applied" && (
                <>
                  <span className="radio">
                    {renderJob.list === "applied" ? (
                      <span className="radioChecked" />
                    ) : (
                      <span className="radioUnchecked" />
                    )}
                  </span>
                </>
              )}
              <label className="radioLabel">
                <a href={renderJob.original || renderJob.url} target="_blank">
                  {renderJob.original ? "apply to original" : "apply on " + renderJob.source}
                </a>
              </label>
            </span>
            {/*
             * save
             */}
            {["new", "maybe", "ignore", "to apply"].reverse().map((val) => (
              <span
                className="radioInput"
                onClick={() => {
                  do_putInList(val)
                }}
              >
                <span className="radio">
                  {renderJob.list === val ? <span className="radioChecked" /> : <span className="radioUnchecked" />}
                </span>
                <label className="radioLabel">{val}</label>
              </span>
            ))}
          </div>
        </div>
        {/*
         * HIGHLIGHTED MENTIONS
         */}
        {mentions.map((found) => found)}
      </div>
      <article>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: renderJob.title }} />
        <h4 className="subtitle">
          <a href={"https://www.google.com/search?tbs=qdr:y2&q=" + renderJob.employer} target="_blank">
            {renderJob.employer}
          </a>
        </h4>
        <div className="body" dangerouslySetInnerHTML={{ __html: renderJob.body }} />
        <h4 className="subtitle">
          <a href={renderJob.original || renderJob.url} target="_blank">
            {renderJob.original ? "view original post" : "view on " + renderJob.source}
          </a>
        </h4>
      </article>
    </JobFullStyled>
  )
}
