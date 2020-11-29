import React, { useState, useEffect } from "react"
import { JobFullStyled } from "./JobFull.styled.js"
import { set_ss_job } from "./lib/jobs.js"

export default function ({ job = {}, removeJob = () => {} }) {
  /*
   * State
   */
  const [renderJob, set_renderJob] = useState({})
  const do_putInList = function (list) {
    // prepare
    let saveJob = { ...renderJob }
    delete saveJob.prev_job
    delete saveJob.next_job
    saveJob.list = list
    renderJob.list = list
    // save cache
    set_ss_job(saveJob.uid, saveJob)
    // save local state
    set_renderJob(saveJob)
    // affect global state
    removeJob(saveJob.uid)
  }
  useEffect(() => {
    if (job && job.title) {
      set_renderJob({ ...job })
    }
  }, [job])

  /*
   * View
   */
  if (!renderJob.body) return null
  let mentions = renderJob.mentions || []
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
            <a href={renderJob.original || renderJob.url} target="_blank">
              <span
                className="radioInput"
                onClick={() => {
                  do_putInList("applied")
                }}
              >
                <span className="radio">
                  {renderJob.list === "applied" ? (
                    <span className="radioChecked" />
                  ) : (
                    <span className="radioUnchecked" />
                  )}
                </span>
                <label className="radioLabel link">apply now</label>
              </span>
            </a>
            {/*
             * save
             */}
            {["new", "maybe", "ignore", "apply later"].reverse().map((val) => (
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
          </a>{" "}
          -{" "}
          <a href={renderJob.original || renderJob.url} target="_blank">
            view on {renderJob.source}
          </a>
        </h4>
        <div className="body" dangerouslySetInnerHTML={{ __html: renderJob.body }} />
      </article>
    </JobFullStyled>
  )
}
