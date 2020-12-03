
import ImageData from '../schema/imageschema'
export class ImadeDataAccess {

    public getAllImages( callback: any){
        return ImageData.find( callback );
    }

    public updateLike( id: string, isLike: boolean, callback: any){
        let likeQuery: any = {}

        if( isLike ){
           likeQuery = { 'no_of_likes': 1}
        } else {
           likeQuery = { 'no_of_likes': -1}
        }
    
        ImageData.findOneAndUpdate({_id: id},{$inc: likeQuery}, callback);
     
    }
}