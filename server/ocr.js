'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
var XMLHttpRequest = require('xhr2');
const csv = require('csv-parser')

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = 'https://healthify.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */
 const drugData = "./assets/Drugs.csv";

 const results = [];
 fs.createReadStream(drugData)
 .pipe(csv())
 .on('data', (data) => results.push(data['Medicine Name']))
//  .on('end', () => {
//    console.log(results);
//  });

function computerVision(url) {
  async.series([
    async function () {

      /**
       * OCR: READ PRINTED & HANDWRITTEN TEXT WITH THE READ API
       * Extracts text from images using OCR (optical character recognition).
       */
      console.log('-------------------------------------------------');
      console.log('READ PRINTED, HANDWRITTEN TEXT AND PDF');
      console.log();

      // URL images containing printed and/or handwritten text. 
      // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
      const printedTextSampleURL = url;

      // Recognize text in printed image from a URL
      console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
      const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
      printRecText(printedResult);

      // Perform read and await the result from URL
      async function readTextFromURL(client, url) {
        // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
        let result = await client.read(url);
        // Operation ID is last path segment of operationLocation (a URL)
        let operation = result.operationLocation.split('/').slice(-1)[0];

        // Wait for read recognition to complete
        // result.status is initially undefined, since it's the result of read
        while (result.status !== "succeeded") { await sleep(1000); result = await client.getReadResult(operation); }
        return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
      }

      // Prints all text from Read result
      function printRecText(readResults) {
        var medName;
        console.log('Recognized text:');
        for (const page in readResults) {
          if (readResults.length > 1) {
            console.log(`==== Page: ${page}`);
          }
          const result = readResults[page];
          if (result.lines.length) {
            for (const line of result.lines) {
              var result_text = line.words.map(w => w.text).join(' '); 
              medName = findDrug(result_text);
              if(medName)
              {
                console.log(medName);
              }
              // console.log(result_text);
            }
          }
          else { console.log('No recognized text.'); }
        }
      }

      /**
       * 
       * Download the specified file in the URL to the current local folder
       * 
       */
      // function downloadFilesToLocal(url, localFileName) {
      //   return new Promise((resolve, reject) => {
      //     console.log('--- Downloading file to local directory from: ' + url);
      //     const request = https.request(url, (res) => {
      //       if (res.statusCode !== 200) {
      //         console.log(`Download sample file failed. Status code: ${res.statusCode}, Message: ${res.statusMessage}`);
      //         reject();
      //       }
      //       var data = [];
      //       res.on('data', (chunk) => {
      //         data.push(chunk);
      //       });
      //       res.on('end', () => {
      //         console.log('   ... Downloaded successfully');
      //         fs.writeFileSync(localFileName, Buffer.concat(data));
      //         resolve();
      //       });
      //     });
      //     request.on('error', function (e) {
      //       console.log(e.message);
      //       reject();
      //     });
      //     request.end();
      //   });
      // }

      function findDrug(searchString) {
        var output = false;
        for(var i = 0; i < results.length; i++)
        {
          var result = results[i].toLowerCase();
          var searchStr = searchString.toLowerCase();
          if(result.includes(searchStr))
            output = searchStr;
          else if(searchStr.includes(result))
            output = result;
        }
        return output;
      }

      /**
       * END - Recognize Printed & Handwritten Text
       */
      console.log();
      console.log('-------------------------------------------------');

    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });
}

// computerVision();
module.exports = computerVision;