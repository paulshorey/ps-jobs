import React from "react"

/**
 * Find and highlight mentions of a word or phrase in a large body of text.
 *    Find phrases which mention a keyword. Highlight the keyword
 * @param src {string} - keyword / search term
 * @param text {string} - fulltext body in which to search for keyword
 * @returns {array} - array of JSX elements, to be used by React like <div>{phrases}</div>
 */
export function find_mentions(src, text, { className = "", caseSensitive = false } = {}) {
  if (!src || !text) return [[], text]
  if (src[0] === "|") src = src.substr(1)
  if (src[src.length - 1] === "|") src = src.substring(0, src.length - 1)
  try {
    // regex flags
    let reFlags = "g" + (caseSensitive ? "" : "i")
    // find
    let phrases = []
    let matches = text.match(new RegExp("([\\w\\d: ’'\"-]{0,120})(" + src + ")([\\w\\d: ’'\"-]{0,240})", reFlags))
    // nothing found, return original
    if (!matches) return [phrases, text]
    // found
    let i = 0
    for (let phrase of matches) {
      let phrase_original = phrase
      let words = phrase.match(new RegExp(src, reFlags))
      for (let word of words) {
        // if glitch, or input is a single letter, do not highlight
        if (!word || src.length < 2) continue
        // highlight word in phrase
        phrase = phrase.replace(word, '<span class="highlighted ' + className + '">' + word + "</span>")
      }
      // highlight phrase in full text
      text = text.replace(phrase_original, phrase)
      // save
      phrases.push(<span key={i + phrase} className="mention" dangerouslySetInnerHTML={{ __html: phrase.trim() }} />)
      i++
    }

    // format
    return [phrases, text]
  } catch (err) {
    // format
    console.error(err)
    return [[], text]
  }
}
