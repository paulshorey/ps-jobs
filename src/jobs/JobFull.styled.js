import styled from "styled-components"

export const JobFullStyled = styled.div`
  overflow: hidden;
  margin: 0.75rem 0.75rem 0.75rem 1.75rem;
  .highlighted {
    background: hsla(88deg, 100%, 75%, 0.75);
    &.subtle {
      background: hsla(57deg, 100%, 70%, 0.75);
    }
  }
  .mentions {
    margin: 0.25rem 0 1.5rem;
    .topLinks {
      float: right;
      font-size: 1rem;
      user-select: none;
      svg {
        vertical-align: -0.2345rem;
      }
    }
    .mention {
      &:before {
        content: "‘";
      }
      &:after {
        content: "’";
      }
      opacity: 0.67;
      border-bottom: solid 2px hsla(57deg, 100%, 70%, 0.75);
      margin: 0 0 0.5rem 1rem;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  article {
    margin-bottom: 0.75rem;
    .title {
      white-space: nowrap;
      font-size: 1.75rem;
      line-height: 1.75rem;
    }
    .subtitle {
      white-space: nowrap;
      font-size: 1rem;
      line-height: 2rem;
      margin-bottom: 0.5rem;
    }
    .meta {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.75rem;
      margin: 0.25rem 0 0;
      opacity: 0.5;
    }
    .body {
      //strong {
      //  font-weight:normal;
      //}
      h4 {
        font-size: 1rem;
        //font-weight: bold;
        margin-bottom: 1rem;
      }
      svg {
        max-width: 18px;
      }
      .grid {
        display: flex;
      }
      ul {
        margin-bottom: 1rem;
      }
      /*
       * remove unnecessary spaces from StackOverflow
       */
      ul > br,
      ul + br,
      p + br,
      p > br:first-child,
      li + br,
      li > br {
        display: none;
      }
      /*
       * fix LinkedIn 
       */
      button[class*="show-more"] {
        display: none;
      }
    }
  }
`
