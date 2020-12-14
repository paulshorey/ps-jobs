import styled from "styled-components"

export const JobsStyled = styled.div`
  font-family: sans-serif;
  fieldset {
    border: none;
    margin: 1rem -1px 0.5rem;
    padding: 0;
  }
  .middle {
    display: flex;
    flex-basis: 360px 720px;
    height: 100vh;
    overflow: auto;
    .side {
      max-width: 100%;
      color: #2557a7;
      position: relative;
      // min/max width to stop from being flexible (parent is display:flex)
      padding: 0.25rem 0;
      overflow: auto;
      background: hsl(67deg, 33%, 99%);
      box-shadow: 2px 4px 6px 4px rgba(0, 0, 0, 0.075);
      flex-basis: 360px;
      flex-shrink: 0;
      flex-grow: 0;
      //resize: horizontal;
      .fullSide {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        opacity: 0.5;
        cursor: pointer;
      }
      &.full {
        flex-basis: 720px;
        @media (min-width: 1280px) {
          min-width: 900px;
        }
      }
      .Links {
        padding: 0;
        cursor: pointer;
      }
    }
    .main {
      position: relative;
      //flex-grow: 1;
      overflow: scroll;
      margin: 0.25rem 0 2.5rem;
      min-width: 720px;
      @media (min-width: 1280px) {
        min-width: 900px;
      }
      @media (max-width: 720px) {
        min-width: 100%
      }
      .full_job_text {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding: 0.5rem 1.5rem;
      }
      .legend {
        margin: 0.8rem 1.6rem 2rem;
      }
      .quotes {
        text-align: center;
        padding: 0 2.5rem;
        opacity: 0.5;
        h2 {
          margin: 0 0 1rem;
        }
      }
    }
  }
  .home {
    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
`
