
import ImageData from '../schema/imageschema'
import * as fs from 'fs';
const path = require('path');
export class ImadeDataAccess {

  public getAllImages(callback: any) {
    return ImageData.find(callback);
  }

  public getAllImagesByFilter(filter: any, callback: any) {
    return ImageData.find(filter, callback);
  }
  public getImagesByImageIds(imageIds, callback: any) {
   return ImageData.find(
      {
        _id:
        {
          $in: imageIds
        }
      },callback)
  }

  public updateLike(id: string, isLike: boolean, callback: any) {
    let likeQuery: any = {}

    if (isLike) {
      likeQuery = { 'no_of_likes': 1 }
    } else {
      likeQuery = { 'no_of_likes': -1 }
    }

    ImageData.findOneAndUpdate({ _id: id }, { $inc: likeQuery }, callback);

  }
  public deletePublicFiles() {
    const directory = 'public';

    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {

        if (file !== '.gitignore') {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      }
    });
  }


}