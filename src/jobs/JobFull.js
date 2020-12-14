import React, { useState, useEffect } from "react"
import { JobFullStyled } from "./JobFull.styled.js"
import { set_ss_job } from "./lib/jobs.js"
import { find_mentions } from "./lib/html"

export default function ({ job = {}, reFind = [], removeJob = () => {}, nextJob = () => {} }) {
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
    set_ss_job(saveJob.company || saveJob.employer, saveJob)
    // save local state
    set_renderJob(saveJob)
    // remove from nav
    // removeJob(saveJob)
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

  // find mentions
  let title = renderJob.title
  let body = renderJob.body
  let mentions = []
  let reFindLast = reFind[reFind.length - 1]
  // find in body
  for (let reFind1 of reFind) {
    let mentionsTuple = find_mentions(reFind1, body, { className: reFind1 === reFindLast ? "" : "subtle" })
    if (!mentionsTuple || !mentionsTuple.length) continue
    let mentionsList = mentionsTuple[0]
    if (!mentionsList.length) continue
    body = mentionsTuple[1]
    mentions = [...mentions, ...mentionsList]
  }
  // find in title
  for (let reFind1 of reFind) {
    let mentionsTuple = find_mentions(reFind1, title, { className: reFind1 === reFindLast ? "" : "subtle" })
    if (!mentionsTuple || !mentionsTuple.length) continue
    let mentionsList = mentionsTuple[0]
    if (!mentionsList.length) continue
    title = mentionsTuple[1]
  }
  // fix
  mentions = mentions.filter((str) => typeof str === "string").map((str) => str.replace(/[0-9]+[A-Z]+/g, ""))
  mentions = [...new Set(mentions)]

  // render
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
                setTimeout(function () {
                  nextJob()
                }, 300)
              }}
            >
              <span className="radio">
                {renderJob.list === "applied" ? <span className="radioChecked" /> : <span className="radioUnchecked" />}
              </span>
              <label className="radioLabel link">
                <a href={renderJob.original || renderJob.url} target="_blank">
                  apply now
                </a>
              </label>
            </span>

            {/*
             * save
             */}
            {["new", "maybe", "ignore", "apply"].reverse().map((val) => (
              <span
                className="radioInput"
                onClick={() => {
                  do_putInList(val)
                  if (val === "ignore" || val === "maybe" || val === "apply") {
                    setTimeout(function () {
                      nextJob()
                    }, 300)
                  }
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
        <div className="mentions" dangerouslySetInnerHTML={{ __html: mentions.toString() }} />
      </div>
      <article>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />
        <h4 className="subtitle">
          <a href={"https://www.google.com/search?tbs=qdr:y2&q=" + renderJob.employer} target="_blank">
            {renderJob.employer}
          </a>{" "}
          -{" "}
          <a href={renderJob.original || renderJob.url} target="_blank">
            view on {renderJob.source}
          </a>
        </h4>
        <div className="body" dangerouslySetInnerHTML={{ __html: body }} />
      </article>
    </JobFullStyled>
  )
}
