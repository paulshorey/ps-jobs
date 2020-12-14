let results = [...document.querySelectorAll(".fRUoiT")].slice(0, 150).map((el) => el.href)
console.log(results.join('\n'))

// let results = [...document.querySelectorAll(".fRUoiT")].slice(0, 150).map((el) => ({
//   title: el.querySelector("h2").innerText,
//   company: el.querySelector("h2 + div > p").innerText,
//   meta: el.querySelector(":scope > div:last-child > p").innerText,
//   original: el.href
// }))
// console.log(JSON.stringify(results))

// let sources = {}
// for (let obj of results) {
//   let host_start = obj.original.indexOf("//") + 2
//   if (host_start === 1) continue // if was -1
//   let host_end = obj.original.indexOf("/", host_start)
//   if (host_end === -1) continue
//   let host = obj.original.substring(host_start, host_end)
//   sources[host] = true
// }
// console.warn(sources)
