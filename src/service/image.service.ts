import fs from 'node:fs';
import path from 'node:path';


class ImageService 
{

    public async upload(base64Data: string): Promise<any>
    {
       try 
       {       
         const { ASSET_PATH } = process.env;   
         const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
         const imageBuffer = Buffer.from(base64Image, 'base64')
         const fileName = `technicians-work-image_${Date.now()}.jpg`
         const uploadPath = path.join('./src/', 'passport', fileName)
         fs.writeFileSync(uploadPath, imageBuffer);
         return  `${ASSET_PATH}${fileName}`; 
       } catch (error: any) {
          throw new Error(error);
       }
    }

    public async uploads(uploads: string): Promise<any>
    {
       try 
       {       
         const { ASSET_PATH } = process.env; 
         let images: string[] = []
         for (let index = 0; index < uploads.length; index++) 
         {  
            const base64Image = uploads[index].replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Image, 'base64')
            const fileName = `technicians-work-image_${Date.now()}.jpg`
            const uploadPath = path.join('./src/', 'testing', fileName)
            fs.writeFileSync(uploadPath, imageBuffer);
            images.push(`${ASSET_PATH}${fileName}`)
         }         
         return  images; 
       } catch (error: any) {
          throw new Error(error);
       }
    }

    public async download(image: string)
    {
       return {}
    }


}

export default ImageService;