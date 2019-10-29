'use strict';

const escapeHtml = require('escape-html');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

const {Logging} = require('@google-cloud/logging');
const PROJECT_ID = 'playground-257402';
const BUCKET_NAME = 'playground-bucket-20191029';

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({projectId: PROJECT_ID});
const bucket = storage.bucket(BUCKET_NAME);
const logger = new Logging();

exports.helloHttp = (req, res) => {
  const gcsname = Date.now() + 'testupload.txt'
  const file = bucket.file(gcsname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: '*/*'
    },
    resumable: false
  });

  stream.on('error', (err) => {
    // handle file upload error
    console.log('Error encountered while creating file');
    console.log(err.message);
  });

  stream.on('finish', () => {
    // done uploading
    console.log('Done uploading');
  });

  stream.write('starting!');
  stream.write(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
  stream.write('done!');
  stream.end();

  res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
};
