// see https://apify.com/apify/web-scraper#page-function
async function pageFunction(context) {
  const $ = context.jQuery;

  //
  // job
  let job = {
    url: context.request.url,
    source: "LinkedIn"
  };
  let BASE_URL = 'https://linkedin.com'

  //
  // job page - save content
  job.meta = ''
  document.querySelectorAll('.topcard h3.topcard__flavor-row').forEach((el)=>{
    job.meta+= ' '+el.innerText+' '
  })
  job.title = ' '+document.querySelector('.topcard h1').innerText.trim()
  job.body = ' '+document.querySelector('.description .description__text').innerHTML.trim()
  job.employer = document.querySelector('.topcard h3.topcard__flavor-row > *:first-child').innerText.trim()

  //
  // success
  return {job:job}
}
