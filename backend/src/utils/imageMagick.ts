let request = require('request');
import * as fs from 'fs';
let im = require('imagemagick');

let download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

async function imageResize(images, req, callback) {
   

    let url = images.url;
    let name = images.image_name;
    //small or large or extra large or default
    let wandh = req.query.size;
    let saveFinal = 'public/' + name + '-default.jpg'
    let downloadName = 'public/' + name + '.jpg'
    if(process.platform == 'win32')
    {
      im.identify.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/identify'
      im.convert.path = 'C:/Program Files/ImageMagick-7.0.10-Q16-HDRI/convert'
    }
    download(url, downloadName, function () {
      let width = 0
      let height = 0
      let dimension = ''
      im.identify(downloadName, function (err, features) {

        if (err) throw err;
          width = features.width;
          height = features.height;
          dimension = width.toString().concat(('x'.concat(height.toString())))
        if (wandh === 'default' || wandh == '') {
          saveFinal = 'public/' + name + '-default.jpg'
          width = features.width;
          height = features.height;
          dimension = width.toString().concat(('x'.concat(height.toString())))
        } else if (wandh === 'small') {

          saveFinal = 'public/' + name + '-small.jpg'
          width = width - (width/2);
          height = height - (height/2)
          dimension = width.toString().concat(('x'.concat(height.toString())))

        } else if (wandh === 'large') {
          saveFinal = 'public/' + name + '-large.jpg'
          
          width = width * 2;
          height = height * 2
          dimension = width.toString().concat(('x'.concat(height.toString())))
          
        } else if (wandh === 'extra_large') {
          saveFinal = 'public/' + name + '-extra_large.jpg'
          width = width * 3;
          height = height * 3
          dimension = width.toString().concat(('x'.concat(height.toString())))
        }              
         im.convert([downloadName, '-resize', dimension, saveFinal],
          function (err, stdout) {
            if (err) throw err;
            callback(saveFinal, { root: '.' })
          })
      });           
    });


     
}

export { imageResize };