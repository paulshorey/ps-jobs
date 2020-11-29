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
        href="https://github.com/paulshorey/ps-jobs"
        target="_blank"
      >
        <span>
          about <FA icon={faGithub} />
        </span>
      </a>
    </HeaderStyled>
  )
}
