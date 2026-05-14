import fs from 'node:fs';
import path from 'node:path';


class ImageService 
{

    public async upload(base64Data: string): Promise<any>
    {
       const company: string = 'storage/technicianswork'
       const filePath: string = ''
       try 
       {       
         const { ORIGIN, URL_PATH } = process.env;   
         const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
         const imageBuffer = Buffer.from(base64Image, 'base64')
         const fileName = `technicians-work-image_${Date.now()}.jpg`
         const uploadPath = path.join('./src/', 'passport', fileName)
         fs.writeFileSync(uploadPath, imageBuffer);
         return  `${ORIGIN}/${URL_PATH}/${fileName}`; 
       } catch (error: any) {
          throw new Error(error);
       }
    }

    public async uploads(uploads: string): Promise<any>
    {
       const company: string = 'storage/technicianswork'
       const filePath: string = ''
       try 
       {       
         const { ORIGIN, URL_PATH } = process.env; 
         let images: string[] = []
         for (let index = 0; index < uploads.length; index++) 
         {  
            const base64Image = uploads[index].replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Image, 'base64')
            const fileName = `technicians-work-image_${Date.now()}.jpg`
            const uploadPath = path.join('./src/', company, fileName)
            // fs.writeFileSync(uploadPath, imageBuffer);
            images.push(`${ORIGIN}/${URL_PATH}/${fileName}`)
            images.push(`${uploadPath}`)
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

    public async retrieve(filename: string)
    {
       const company: string = 'testing'


    }


}

export default ImageService;