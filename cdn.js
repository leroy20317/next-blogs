const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const rd = require('rd');
const co = require('co');

const { S3, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const folderName = require('./package.json').name;

// // 创建 七牛 S3 客户端对象
const kodoClient = new S3({
  region: 'z2',
  endpoint: 'https://s3.cn-south-1.qiniucs.com',
  credentials: { accessKeyId: process.env.ACCESSKEY, secretAccessKey: process.env.SECRETKEY },
});

// 文件上传
function upload(key, localFile) {
  return kodoClient.send(
    new PutObjectCommand({
      Bucket: 'leroy20317',
      Key: key,
      Body: fs.createReadStream(localFile),
    }),
  );
}

// 异步遍历目录下的所有文件
rd.each(
  path.join(__dirname, './build/static'),
  function (f, s, next) {
    if (s.isFile()) {
      let ossName = f.replace(path.join(__dirname, '/build'), `${folderName}/_next`);
      ossName = path.normalize(ossName).replace(/\\/g, '/');

      co(function* () {
        try {
          const result = yield upload(ossName, f);
          return result;
        } catch (error) {
          console.log(error);
        }
        // return result;
      }).then(function () {
        console.log(`上传文件至 https://cdn.leroytop.com/${ossName} 成功`);
      });
    }
    next();
  },
  function (err) {
    if (err) throw err;
  },
);

rd.each(
  path.join(__dirname, './public/static'),
  function (f, s, next) {
    if (s.isFile()) {
      let ossName = f.replace(__dirname, folderName);
      ossName = path
        .normalize(ossName)
        .replace(/\\/g, '/')
        .replace(/public\//g, '');

      co(function* () {
        try {
          const result = yield upload(ossName, f);
          return result;
        } catch (error) {
          console.log(error);
        }
      }).then(function () {
        console.log(`上传文件至 https://cdn.leroytop.com/${ossName} 成功`);
      });
    }
    next();
  },
  function (err) {
    if (err) throw err;
  },
);
