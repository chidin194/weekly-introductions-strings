const sampleText = `Pub Date,Title,Authors
29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien
01/08/1996,A Game of Thrones,George Raymond Martin
21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling`;

let sampleTextArray = sampleText.split('\n');

const firstColumnLength = 11;
const secondColumnLength = 29;
const thirdColumnLength = 21;
const totalLength = 69;

const transformUsDateToUkDate = (usDate) => {
  const [day, month, year] = usDate.split('/');
  const date = new Date(year, month-1, day);
  return date.toLocaleDateString('en-gb', { year: 'numeric', month: 'short', day: 'numeric'})
}

const enforceColumnLength = (content, columnLength) => {
  const truncated = content.length > columnLength 
    ? content.substring(0, columnLength -3) + "..."
    : content
  return truncated.padStart(columnLength)
}

const formatColumn = (inputRow) => {
  const [usDate, title, author] = inputRow.split(",");
  const dateColumn = transformUsDateToUkDate(usDate).padEnd(firstColumnLength)
  const titleColumn = enforceColumnLength(title, secondColumnLength)
  const authorColumn = enforceColumnLength(author, thirdColumnLength)
  return `\n| ${dateColumn} | ${titleColumn} | ${authorColumn} |`
}

let outputString = "";

for (let i=0; i < sampleTextArray.length; i++) {
  if (i == 0) {
    let titles = sampleTextArray[0].split(",");
    outputString += `| ${titles[0].padEnd(firstColumnLength)} | ${titles[1].padStart(secondColumnLength)} | ${titles[2].padEnd(thirdColumnLength)} |
|${"=".repeat(totalLength)}|`
  } else {
    outputString += formatColumn(sampleTextArray[i])
  }
}

console.log(outputString);