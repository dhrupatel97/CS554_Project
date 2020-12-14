import UserData from '../schema/userschema'

export class UserDataAccess {
    public hasUserLiked( userId: string, photoId: String, callback: any ){
        UserData.findById( userId, (err: any, data: any) => {
            if( err ){
                throw( err )
            } else {
                if( data && data.likedImages &&  Array.isArray(data.likedImages) && data.likedImages.includes( photoId) ){
                    callback( false );
                } else {
                    callback( true );
                }
            }
        })
    }

    public updateLikedImage( userId: string, photoId: string, isLike: boolean ) {
        console.log( "updateLikedImage hasUserliked", isLike, userId, photoId)
        if( isLike )
            UserData.findByIdAndUpdate( userId, { $push : { "likedImages" : photoId}}, ( err: any, data: any) => {
                if( err ){
                    throw err.message;
                } else {
                    console.log( "likedImages", data );
                }
            });
        else
            UserData.findByIdAndUpdate( userId, { $pull : { "likedImages" : photoId}}, ( err: any, data: any) => {
                if( err ){
                    throw err.message;
                } else {
                    console.log( data );
                }
            });
    }
}