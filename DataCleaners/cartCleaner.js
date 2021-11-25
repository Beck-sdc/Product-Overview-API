const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');


const originFilePath = path.join(__dirname, '../OriginalData/cart.csv');
const destinationFilePath = path.join(__dirname, '../CleanData/cartClean.csv');


fs.writeFileSync(destinationFilePath, '');

const readableStream = fs.createReadStream(originFilePath);
const writableStream = fs.createWriteStream(destinationFilePath);
const csvStream = csv.format({ headers: true });
csvStream.pipe(writableStream);

readableStream
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    csvStream.write(row);
  })
  .on('end', () => {
    csvStream.end();
  });