import React from "react"
import { HeaderStyled } from "./Header.styled.js"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faPuzzlePiece } from "@fortawesome/pro-solid-svg-icons"

export default function () {
  return (
    <HeaderStyled>
      <h1>
        <FA icon={faPuzzlePiece} />{" "}
        <a href="https://paulshorey.com" target="_blank">
          Paul's
        </a>{" "}
        "remote mid-senior javascript node react" Job Search
      </h1>
      <a
        href="https://www.indeed.com/jobs?q=%28javascript+or+js%29+%28node+or+nodejs+or+es6+or+%22+AI+%22+or+ui+or+ux+or+uiux+or+elasticsearch%29+%28remote+or+wfh+or+telecommute+or+remotely+or+%22work+from%22%29+-junior+-jr+-intern+-graduate+-associate+-qa+-java+-temporarily+-%22.net%22+-j2ee&fromage=14"
        target="_blank"
      >
        <span>
          about <FA icon={faGithub} />
        </span>
      </a>
    </HeaderStyled>
  )
}
