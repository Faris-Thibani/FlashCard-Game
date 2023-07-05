const csvFilePath = 'data.csv'; // Update with your CSV file path
const jsonFilePath = 'data.json'; // Specify the output JSON file path

const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    const jsonData = JSON.stringify(jsonArray, null, 2);

    fs.writeFile(jsonFilePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('CSV file converted to JSON successfully!');
      }
    });
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });
