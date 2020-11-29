import React, { createRef } from "react"
import { JobStyled } from "./Job.styled.js"

export default class Links extends React.Component {
  constructor(props) {
    super(props)
    this.jobRef = createRef()
  }

  // shouldComponentUpdate(nextProps) {
  //   /*
  //    * ONLY UPDATE COMPONENT if it is selected/deselected, not if content changed.
  //    * To update content, re-build entire list of jobs at the container level.
  //    */
  //   return nextProps.className !== this.props.className
  // }
  componentDidUpdate() {
    if (this.props.className.includes("highlight")) {
      let el = this.jobRef.current
      if (el) {
        setTimeout(function(){
          el.scrollIntoView(false)
        })
      }
    }
  }

  render() {
    const { job = {}, src = "" } = this.props
    if (!job.title) return null
    return (
      <JobStyled className={"Job " + (this.props.className || "")} ref={this.jobRef}>
        <h4 className="title" dangerouslySetInnerHTML={{ __html: job.title }} />
        <div className="meta mentions">
          {job.employer ? <span>{job.employer} - </span> : null}
          <span>{(job.mentions || []).map((found) => found)}</span>
        </div>
      </JobStyled>
    )
  }
}
