const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const qiniu = require('qiniu');
const rd = require('rd');
const co = require('co');
const folderName = require('./package.json').name;
const accessKey = process.env.ACCESSKEY;
const secretKey = process.env.SECRETKEY;

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config({
  zone: qiniu.zone.Zone_z2, // 华南
});

const options = { scope: 'leroy20317', expires: 7200 };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

const upload = function (key, localFile) {
  return new Promise((resolve, reject) => {
    // 文件上传
    formUploader.putFile(
      uploadToken,
      key,
      localFile,
      putExtra,
      function (respErr, respBody, respInfo) {
        putExtra.mimeType = null; // 重置MIME类型
        if (respErr) {
          reject(respErr);
          throw respErr;
        }
        resolve(respBody);
        if (respInfo.statusCode === 200) {
          // console.log(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      },
    );
  });
};

// 异步遍历目录下的所有文件
rd.each(
  path.join(__dirname, './build/static'),
  function (f, s, next) {
    putExtra.mimeType = null;
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
        console.log(`上传文件至 https://cdn.leroy.net.cn/${ossName} 成功`);
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
    putExtra.mimeType = null;
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
        console.log(`上传文件至 https://cdn.leroy.net.cn/${ossName} 成功`);
      });
    }
    next();
  },
  function (err) {
    if (err) throw err;
  },
);
