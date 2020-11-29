/*
 * Get jobs from localStorage
 *    TODO: convert to IndexedDB
 */
export function get_all_ss_jobs_in_list(list) {
  let jobsDict = {}
  for (let uid in window.localStorage) {
    let jobJSON = window.localStorage[uid]
    if (typeof jobJSON !== "string") continue
    // console.log(uid, jobJSON.substring(0, 50))
    if (jobJSON.includes(`"list":"${list}"`)) {
      jobsDict[uid] = JSON.parse(jobJSON)
    }
  }
  return jobsDict
}
/*
 * Save job to localStorage
 *    TODO: convert to IndexedDB
 */
export function set_ss_job(key, value) {
  if (typeof window === "object") {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

/*
 * Combine from sources, use fix_job() to convert to standard structure
 */
export function aggregate_jobs(lists) {
  let jobsDict = {}
  for (let list of lists) {
    for (let obj of list) {
      if (!obj) continue
      // handle individual job
      if (obj.job && obj.job.body) {
        if (!obj.job.url && obj.url) {
          obj.job.url = obj.url
        }
        let job = obj.job
        // fix
        if (!job.source === "LinkedIn") {
          job = fixIndeed(job)
        }
        // unique ?
        job.uid = (job.title + (job.employer || job.company)).toLowerCase()
        if (jobsDict[job.uid]) continue
        // add
        jobsDict[job.uid] = fixJob(job)
        continue
      }
      // handle stackoverflow rss feed
      if (obj.pubDate) {
        let job = obj
        if (!job || !job.description) continue
        job = fixStackoverflowRSS(job)
        // unique ?
        job.uid = (job.title + (job.employer || job.company)).toLowerCase()
        if (jobsDict[job.uid]) continue
        // add
        jobsDict[job.uid] = fixJob(job)
        continue
      }
      // // handle list of jobs (from APIFY stackoverflow-based output)
      // if (obj.jobs && typeof obj.jobs === "object") {
      //   for (let uid in obj.jobs) {
      //     let job = obj.jobs[uid]
      //     if (!job || !job.body) continue
      //     job = fixStackoverflowRSS(obj.job)
      //     // unique ?
      //     let uid = job.title + (job.employer || job.company)
      //     if (jobsDict[uid]) continue
      //     // add
      //     jobsDict[uid] = job
      //     continue
      //   }
      // }
      console.warn("skipped job", obj)
    }
  }
  return jobsDict
}

/*
 * Temporary logic, to standardize job objects.
 *    TODO: move to web-crawlers, then remove from here!
 */
export function fixJob(job) {
  let com_i = job.title.indexOf(",")
  if (com_i !== -1) {
    job.title = job.title.substring(0, com_i)
  }
  if (job.title) job.title = job.title.trim()
  if (job.employer) {
    job.employer = job.employer.trim()
    if (job.employer.substring(0, 3) === "at ") job.employer = job.employer.substr(3)
  }
  if (job.company) job.company = job.company.trim()
  if (job.meta) job.meta = job.meta.replace(" ago", " ago ").replace(/[\w]+/g, " ")
  return job
}
export function fixIndeed(job) {
  if (job.meta) {
    // add to body
    job.meta = job.meta.replace(
      /If you require alternative methods of application or screening, you must approach the employer directly to request this as Indeed is not responsible for the employer's application process./gi,
      ""
    )
    job.meta = job.meta.replace(/Report job|original job/gi, "")
    job.meta = job.meta.replace(/[-\s]+$/gi, "")
    job.body += "\n<b> Meta: " + job.meta + "</b><br />"
    // employer
    let company = ""
    let company_i = job.meta.indexOf(" - ")
    if (company_i !== -1) {
      company = job.meta.substring(0, company_i).trim()
    }
    job.employer = company
  }
  job.body += "\n<b> Company: " + job.company + "</b><br />"
  job.body += "\n<b> Employer: " + job.employer + "</b><br />"
  job.source = "Indeed.com"
  return job
}
export function fixStackoverflowRSS(job) {
  job.employer = (job.author.name || {}).__text
  job.body = job.description
  job.title = job.title.replace("(allows remote)", "")
  {
    let title_par = job.title.indexOf("(")
    if (title_par >= 20) {
      job.subtitle = job.title.substr(title_par)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  {
    let title_par = job.title.indexOf("|")
    if (title_par >= 20) {
      job.subtitle = job.title.substr(title_par + 1)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  {
    let title_par = job.title.indexOf(" - ")
    if (title_par >= 20) {
      job.subtitle = job.title.substr(title_par + 3)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  job.body = job.body.replace("()", "")
  job.url = job.link
  job.meta = (job.location || {}).__text + " - " + (job.category || []).toString()
  delete job.link
  delete job.description
  delete job.author
  delete job.guid
  delete job.location
  delete job.category
  job.source = "Stackoverflow"
  return job
}
