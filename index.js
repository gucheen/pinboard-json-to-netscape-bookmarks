import fs from 'fs'

// set your pinboard raw data file path
const rawFile = 'bookmarks.json'
// set your output bookmarks file path
const outputHTML = 'bookmarks.html'

const pinboardData = JSON.parse(fs.readFileSync(rawFile).toString())

// write the standard bookmark header part
fs.writeFileSync(outputHTML, `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.
It will be read and overwritten.
Do Not Edit! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
<H1>Bookmarks</H1>
<DL>
`)

for (const item of pinboardData) {
  // basic properties in bookmark was href, add_data, tags, title and description
  const url = item.href
  // netscape bookmark use unix timestamp
  const date = new Date(item.time).valueOf()
  // netscape bookmark seperate tags by comma
  const tags = item.tags.split(' ').join(',')
  const title = item.description
  const description = item.extended
  const dd = `<DT><A HREF="${url}" ADD_DATE="${date}" TAGS="${tags}">${title}</A>
  `
  fs.appendFileSync(outputHTML, dd)
  if (description) {
    // append description if defined
    fs.appendFileSync(outputHTML, `<DD>${description}\n`)
  }
}

// write end part
fs.appendFileSync(outputHTML, '</DL>\n')