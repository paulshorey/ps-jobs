import React from "react"
import { get_all_ss_jobs_in_list, aggregate_jobs } from "./lib/jobs.js"
import Links from "./Links.js"
import Home from "./Home.js"
import Search from "./Search.js"
import { JobsStyled } from "./Jobs.styled.js"
import Header from "src/jobs/Header.js"
import keydown from "react-keydown"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faExpandAlt } from "@fortawesome/pro-solid-svg-icons"

/*
 * Import sources, aggregate: --- THIS SHOULD BE MOVED TO BACKEND - INGEST INTO ELASTICSEARCH ---
 */
import stackoverflow2012 from "./json/listings/stackoverflow-20-12.json"
import indeed2012 from "./json/listings/indeed-20-12.json"
import linkedin2011 from "./json/listings/linkedin-20-11.json"
import indeed2011 from "./json/listings/indeed-20-11.json"
import stackoverflow2011 from "./json/listings/stackoverflow-20-11.json"
import justremote2011 from "./json/listings/justremoteco-20-11.json"
import JobFull from "./JobFull"
let jobsDict = aggregate_jobs([stackoverflow2012, indeed2012, linkedin2011, stackoverflow2011, justremote2011, indeed2011]) //

/*
 * Render, search variables:
 */
export default class Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reList: "new",
      reExclude:
        "our client|java |coordinator|ruby on rails|qa engineer|no remote|remote at first|remote option|work from home at least|remote at first|work from home perks|remotely on occasion",
      reFind: [
        "remote|wfh|commut|work from|temp",
        "[^\\w]US[ ,A]+|Canada|United.{0,3}States|America|[A-Z]{1}[w]+, ?[A-Z]{2} |NYC|Oregon|Colorado|Utah|Montana|Seattle|Washington|Vermont|Texas|RI|Florida|Nevada|Portland|San Francisco|Denver|New York| EST|PST|CST",
        "full.{0,3}stack|front.{0,3}end"
      ],
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
    this.findMentions(this.state, false) // set 2nd argument to true, to auto-select first job
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
    this.setState({ jobsFound, jobsFoundLength, jobSelected: job.next_job || job.prev_job || job })
  }
  findMentions = ({ reFind, reExclude = "", reList = "" }, selectFirst = true) => {
    // set search string, reset results
    this.setState({ reExclude, reFind, jobSelected: {}, jobsFoundLength: 0 }, () => {
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
      for_jobsDict: for (let uid in jobsDictUse) {
        // each job
        let job = { ...jobsDictUse[uid] }
        job.uid = (job.title + job.employer).toLowerCase()
        // exclude cached data - if new
        if (reList === "new" && window.localStorage[job.company || job.employer]) continue
        // hide recruiters
        if (this.state.noRecruiters) {
          if (!job.employer) continue
        }
        // exclude words
        if (reExclude) {
          try {
            // in body
            let matches = job.body.match(new RegExp("(" + reExclude + ")", "uim"))
            if (matches) {
              continue
            }
          } catch (e) {
            // error
            continue
          }
        }
        /*
         * find and highlight the mentions inside title and body
         */
        for (let reFind1 of reFind) {
          if (reFind1) {
            try {
              // flags
              let caseSensitive = reFind1.toLowerCase() !== reFind1
              let reFlags = caseSensitive ? "um" : "uim"
              // in title
              if (!(job.title + job.body).match(new RegExp("(" + reFind1 + ")", reFlags))) {
                continue for_jobsDict
              }
            } catch (e) {
              // error
              continue for_jobsDict
            }
          }
        }
        // duplicate job, already in list
        if (jobsFound[(job.title + job.employer).toLowerCase()]) {
          // delete it
          // jobsFound[(job.title + job.employer).toLowerCase()] = null
          continue
        } else {
          // new job, does not exist, save it
          // save, with unique key
          jobsFound[(job.title + job.employer).toLowerCase()] = job
          jobsFoundLength++
        }
        // auto-select first found result
        if (selectFirst && !jobSelected.body) {
          jobSelected = job
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
    // scroll to job content (all the way right)
    if (this.state.jobSelected.uid && typeof window === "object") {
      let el = window.document.querySelector(".main")
      if (el) {
        el.scrollIntoView({
          behavior: "smooth"
        })
      }
    }
    // render list
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
              reFind={this.state.reFind}
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
                <JobFull
                  reFind={this.state.reFind}
                  job={this.state.jobSelected}
                  removeJob={this.removeJob}
                  nextJob={this.nextJob}
                />
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
