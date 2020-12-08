import React from "react"
import { get_all_ss_jobs_in_list, aggregate_jobs } from "./lib/jobs.js"
import { find_mentions } from "./lib/stringToJSX.js"
import Links from "./Links.js"
import Home from "./Home.js"
import Search from "./Search.js"
import { JobsStyled } from "./Jobs.styled.js"
import Header from "src/components/jobs/Header.js"
import keydown from "react-keydown"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faExpandAlt } from "@fortawesome/pro-solid-svg-icons"

/*
 * Import sources, aggregate:
 */
import linkedin from "./json/linkedin.json"
import indeed from "./json/indeed.json"
import stackoverflow from "./json/stackoverflow.json"
import justremote from "./json/justremoteco.json"
import JobFull from "./JobFull"
let jobsDict = aggregate_jobs([stackoverflow, indeed, linkedin, justremote])

/*
 * Render, search variables:
 */
export default class Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reList: "new",
      reExclude:
        "no remote|remote at first|remote option|work from home at least|remote at first|work from home perks|remotely on occasion",
      reFind1: "remote|wfh|telecommut|from[ -]?home|grow|culture",
      reFind2: "[ ,]+[US]+[ ,]+|[^\\w]USA[ ,]+|Canada|United.{0,3}States|America|[A-Z]{1}[\w]+, ?[A-Z]{2} |NYC|Oregon|Colorado|Utah|Montana|Seattle|Washington|Vermont|Texas|RI|Florida|Nevada|Portland|San Francisco|Denver|New York|EST|PST|CST|culture",
      jobSelected: {},
      jobsFound: {},
      jobsFoundLength: 0,
      noRecruiters: true,
      fullSide: false
    }
  }
  /*
   * case-insensitive include:
   * |NLP|AI[\s,\.\-"]+|
   * |front-?end |
   * front.{0,3}end|full.{0,3}stack|analytics|user|labs|cool|fun[^\w]|product
   *
   * Case Sensitive Include:
   * [^\\w]US[ ,]+|[^\\w]USA[ ,]+|Canada
   *
   * Exclude:
   * |data scientist |ai engineer|
   */
  componentDidMount() {
    /*
     * Load data on page load
     */
    this.findMentions(this.state, false)
    /*
     * USER interaction: key press
     */
    if (typeof window === "object") {
      window.document.addEventListener("keydown", this.handleKeyDown)
    }
  }
  componentWillUnmount() {
    if (typeof window === "object") {
      window.document.removeEventListener("keydown", this.handleKeyDown)
    }
  }

  /*
   * KEY PRESS - prev/next job
   */
  handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      this.nextJob()
    }
    if (e.key === "ArrowUp") {
      this.prevJob()
    }
  }
  nextJob = () => {
    // no job selected, so select the first in list
    if (!this.state.jobSelected.body) {
      for (let uid in this.state.jobsFound) {
        if (this.state.jobsFound[uid]) {
          this.setState({ jobSelected: this.state.jobsFound[uid] })
          break
        }
      }
      return
    }
    // select next job
    if (!this.state.jobSelected.next_job) return
    this.setState({ jobSelected: this.state.jobSelected.next_job })
  }
  prevJob = () => {
    // select previous job
    if (!this.state.jobSelected.body) return
    if (!this.state.jobSelected.prev_job) return
    this.setState({ jobSelected: this.state.jobSelected.prev_job })
  }

  /*
   * USER INTERACTIONS
   */
  removeJob = (uid) => {
    let job = this.state.jobsFound[uid]
    if (!job) return
    let jobsFound = this.state.jobsFound
    let jobsFoundLength = this.state.jobsFoundLength - 1
    // it's a linked list, so, fix the relationships
    if (job.prev_job) {
      job.prev_job.next_job = job.next_job // can be undefined, it's ok
    }
    if (job.next_job) {
      job.next_job.prev_job = job.prev_job // can be undefined, it's ok
    }
    // remove
    delete this.state.jobsFound[uid]
    // save
    this.setState({ jobsFound, jobsFoundLength, jobSelected: job })
  }
  findMentions = ({ reFind1 = "", reFind2 = "", reExclude = "", reList = "" }, selectFirst = true) => {
    // set search string, reset results
    this.setState({ reExclude, reFind1, reFind2, jobSelected: {}, jobsFoundLength: 0 }, () => {
      let jobsFoundLength = 0
      let jobsFound = {}
      let jobSelected = {}
      /*
       * use cached data if NOT "new"
       */
      let jobsDictUse = reList === "new" ? { ...jobsDict } : get_all_ss_jobs_in_list(reList)
      /*
       * iterate ORIGINAL UNCHANGED list, and
       * save filtered items to new variable
       */
      let job_prev = {}
      let job_i = 0
      for (let uid in jobsDictUse) {
        // each job
        let job = { ...jobsDictUse[uid] }
        job.uid = (job.title + job.employer).toLowerCase()
        // exclude cached data - if new
        if (reList === "new" && window.localStorage[job.uid]) continue
        // hide recruiters
        if (this.state.noRecruiters) {
          if (!job.employer) continue
        }
        // exclude words
        if (reExclude) {
          // in body
          let matches = job.body.match(new RegExp("(" + reExclude + ")", "uim"))
          if (matches) {
            continue
          }
        }
        /*
         * find and highlight the mentions inside title and body
         */
        if (reFind1 || reFind2) {
          if (reFind1) {
            // in title
            let highlightTitle = find_mentions(reFind1, job.title, { className: "subtle" })
            if (highlightTitle && highlightTitle[1]) {
              job.title = highlightTitle[1]
            }
            // in body
            let mentionsTuple = find_mentions(reFind1, job.body, { className: "subtle" })
            if (!mentionsTuple || !mentionsTuple.length) continue
            let mentionsList = mentionsTuple[0]
            if (!mentionsList.length) continue
            job.body = mentionsTuple[1]
            job.mentions = mentionsList
          }
          if (reFind2) {
            // in title
            let highlightTitle = find_mentions(reFind2, job.title, { caseSensitive: true })
            if (highlightTitle && highlightTitle[1]) {
              job.title = highlightTitle[1]
            }
            // in body
            let mentionsTuple = find_mentions(reFind2, job.body, { caseSensitive: true })
            if (!mentionsTuple || !mentionsTuple.length) continue
            let mentionsList = mentionsTuple[0]
            if (!mentionsList.length) continue
            job.body = mentionsTuple[1]
            job.mentions = job.mentions ? [...mentionsList, ...job.mentions] : mentionsList
          }
          // auto-select first found result
          if (selectFirst && !jobSelected.body) {
            jobSelected = job
          }
          // save, with unique key
          jobsFound[(job.title + job.employer).toLowerCase()] = job
          jobsFoundLength++
        } else {
          // save, with unique key
          jobsFound[(job.title + job.employer).toLowerCase()] = job
          jobsFoundLength++
        }
        // which list
        if (!job.list) {
          job.list = "new"
        }
        // remember job
        if (job_prev) {
          job.prev_job = job_prev
          job_prev.next_job = job
        }
        // next job
        job_i++
        job_prev = job
      }
      /*
       * output FILTERED EDITED list
       */
      this.setState({ jobsFound, jobsFoundLength, jobSelected })
    })
  }

  /*
   * VIEW
   */
  render() {
    return (
      <JobsStyled>
        <Header />
        <div className="middle">
          <div className={"side " + (this.state.fullSide ? " full" : "")}>
            <FA
              className="fullSide"
              icon={faExpandAlt}
              onClick={() => {
                this.setState({ fullSide: !this.state.fullSide })
              }}
            />
            {/*
             * SEARCH - highlight word
             */}
            <Search
              reList={this.state.reList}
              reExclude={this.state.reExclude}
              reFind1={this.state.reFind1}
              reFind2={this.state.reFind2}
              onChange={(state) => {
                this.findMentions(state)
              }}
              jobsFound={this.state.jobsFound}
              jobsFoundLength={this.state.jobsFoundLength}
            />
            {/*
             * NAVIGATION - jobs links
             */}
            <Links
              className="jobs"
              jobsFound={this.state.jobsFound}
              jobSelected={this.state.jobSelected}
              reFind1={this.state.reFind1}
              reFind2={this.state.reFind2}
              onClick={(job) => {
                this.setState({ jobSelected: job })
              }}
            />
          </div>
          <div className="main">
            {this.state.jobSelected.uid ? (
              <>
                {/*
                 * FULL DESCRIPTION - selected job
                 */}
                <JobFull job={this.state.jobSelected} removeJob={this.removeJob} nextJob={this.nextJob} />
              </>
            ) : (
              <>
                {/*
                 * NO JOB SELECTED - show homepage
                 */}
                <Home />
              </>
            )}
          </div>
        </div>
      </JobsStyled>
    )
  }
}

// exclude certain jobs
// let pay_i = job.body.indexOf("- $")
// console.log("pay_i", pay_i)
// if (pay_i !== -1) {
//   let pay = job.body.substr(pay_i, 8)
//   console.log("pay", job.title.substr(0, 30), pay)
// }
