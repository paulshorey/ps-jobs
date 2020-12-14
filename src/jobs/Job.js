import React, { createRef } from "react"
import { JobStyled } from "./Job.styled.js"

export default class Links extends React.Component {
  constructor(props) {
    super(props)
    this.jobRef = createRef()
  }

  componentDidUpdate() {
    if (this.props.className.includes("highlight")) {
      let el = this.jobRef.current
      if (el && el.getBoundingClientRect().bottom > window.innerHeight) {
        el.scrollIntoView(false)
      }
    }
  }

  render() {
    const { job = {} } = this.props
    if (!job.title) return null
    return (
      <JobStyled className={"Job " + (this.props.className || "")} ref={this.jobRef}>
        <h4 className="title" dangerouslySetInnerHTML={{ __html: job.title }} />
        <div className="meta mentions">
          {(job.company||job.employer) ? <span>{job.company||job.employer}</span> : null}
          {/*<span>{(job.mentions || []).map((found) => found)}</span>*/}
        </div>
      </JobStyled>
    )
  }
}
