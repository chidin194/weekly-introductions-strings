const sampleText = `Pub Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

let sampleTextArray = sampleText.split('\n');

const firstColumnLength = 11;
const secondColumnLength = 29;
const thirdColumnLength = 21;
const totalLength = 69;

let outputString = "";

const formatString = (string, columnLength) => { return string.length > columnLength 
  ? string.substring(0, columnLength -3) + "..."
  : string}

for(let i=0; i < sampleTextArray.length; i++) {
  if (i == 0) {
    let titles = sampleTextArray[0].split(",");
    outputString += `| ${titles[0].padEnd(firstColumnLength)} | ${titles[1].padStart(secondColumnLength)} | ${titles[2].padEnd(thirdColumnLength)} |
|${"=".repeat(totalLength)}|`
  } else {
    let row = sampleTextArray[i].split(",");
    let [pubDate, title, author] = [row[0], row[1], row[2]];
    let [day, month, year] = pubDate.split('/');
    let formattedPubDate = new Date(year, month-1, day);
    pubDate = formattedPubDate.toLocaleDateString(  'en-gb',  {    year: 'numeric',    month: 'short',    day: 'numeric'});
    title = formatString(title, secondColumnLength);
    author = formatString(author, thirdColumnLength)
    outputString += `\n| ${pubDate.padEnd(firstColumnLength)} | ${title.padStart(secondColumnLength)} | ${author.padStart(thirdColumnLength)} |`
  }
}

console.log(outputString);

// node --icu-data-dir=node_modules/full-icu 'parsing.js'

