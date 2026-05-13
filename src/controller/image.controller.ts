import { Router, Request, Response, NextFunction } from "express"
import IController from "@/interfaceIController"
import ImageService from "@/service/image.service"
import { readdir, unlink } from 'node:fs/promises';
import path, { join } from 'node:path'
import * as fs from 'fs'
               

class ImageController implements IController {

    public path = '/image';
    public router = Router();
    private imageService = new ImageService();

    constructor()
    {
        this.initializeRoutes()
    }

    private initializeRoutes(): void
    {
        this.router.post(`${this.path}/upload`,
            // validateMiddleware(validate.testing),
            this.singleUpload
        )
        this.router.post(`${this.path}/uploads`,
            // validateMiddleware(validate.testing),
            this.multipleUpload
        )
        this.router.post(`${this.path}/single-delete`,
            // validateMiddleware(validate.register),
            this.singleDelete
        )
        this.router.post(`${this.path}/multiple-delete`,
            // validateMiddleware(validate.register),
            this.multipleDelete
        )
        this.router.post(`${this.path}/download`,
            // validateMiddleware(validate.register),
            this.download
        )
    }

    private singleUpload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        
        try 
        {
           const { image } = req?.body
        //    res.status(200).json(image)
           const UploadImage = await this.imageService.upload(image)
           const data: { message: string, data: object, statusCode: number } = 
           {
              message: 'upload successful',
              data: UploadImage,
              statusCode: 200
           }
           res.status(200).json(data)

        } catch (error: any) {
           const err = JSON.parse(error.message)
           const errMsg = err.message 
           const code = err.statusCode
            
           const data: any = 
           {
              message: errMsg,
              data: { },
              statusCode: code
           }
           res.status(code).json(data)
        }
    
    }

    private multipleUpload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        
        try 
        {
           const { uploads } = req?.body
           
           if(!Array.isArray(uploads))
           {
              const data: { message: string, data: object, statusCode: number } = 
              {
                message: 'Input has to be an array',
                data: {  },
                statusCode: 200
              }
              res.status(200).json(data)

           }
           
           const UploadImage = await this.imageService.uploads(uploads)
           const data: { message: string, data: any, statusCode: number } = {
              message: 'upload successful',
              data: UploadImage,
              statusCode: 200
           }
           res.status(200).json(data)

        } catch (error: any) {
           const err = JSON.parse(error.message)
           const errMsg = err.message 
           const code = err.statusCode
            
           const data: any = 
           {
              message: errMsg,
              data: { },
              statusCode: code
           }
           res.status(code).json(data)
        }
    
    }

    private singleDelete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        
       const company: string = 'storage/technicianswork'
      try
      {
         const { fileName } = req.body
         const pathToFile: string = './src/'
         const filePath = path.join(pathToFile, company, fileName)
         if(!fs.existsSync(filePath))
         {
           const data: { message: string, data: object, statusCode: number } = 
           {
              message: 'deleting file failed',
              data: { },
              statusCode: 200
           }
           res.status(200).json(data)
         } else {            
            fs.unlinkSync(filePath)               
            const data: { message: string, data: object, statusCode: number } = 
            {
              message: 'File sucessfully removed',
              data: { },
              statusCode: 200
            }     
            res.status(200).json(data)
         }

      } catch (error: any) {
         const err = JSON.parse(error.message)
         const errMsg = err.message 
         const code = err.statusCode
      
         const data: any = 
         {
           message: errMsg,
           data: { },
           statusCode: code
         }
         res.status(code).json(data)
      }
    }

    private multipleDelete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
       
      const { fileNames } = req.body
       const pathToFile: string = './src/'
       const company: string = 'storage/technicianswork'
      try
      {
         if(!Array.isArray(fileNames))
         {
            const data: { message: string, data: object, statusCode: number } = 
            {
              message: 'Input has to be an array',
              data: {  },
              statusCode: 200
            }
            res.status(200).json(data)
         }
         const deletionPromises = fileNames.map((file: string) => 
         {
            const filePath = path.join(pathToFile, company, file)
            fs.unlinkSync(filePath);
         });
         await Promise.all(deletionPromises); 

         const data: { message: string, data: object, statusCode: number } = 
         {
           message: 'File sucessfully removed',
           data: { },
           statusCode: 200
         }     
         res.status(200).json(data)
         

      } catch (error: any) {

         const err = JSON.parse(error.message)
         const errMsg = err.message 
         const code = err.statusCode
      
         const data: any = 
         {
           message: errMsg,
           data: { },
           statusCode: code
         }
         res.status(code).json(data)
      }
    }

    private retrieve = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        
      try
      {
         const { folder, fileName } = req.body
         const pathToFile: string = './src/'
         const filePath = path.join(pathToFile, folder, fileName)
         if(!fs.existsSync(filePath))
         {
           const data: { message: string, data: object, statusCode: number } = 
           {
              message: 'deleting file failed',
              data: { },
              statusCode: 200
           }
           res.status(200).json(data)
         } else {            
            await unlink(filePath)               
            const data: { message: string, data: object, statusCode: number } = 
            {
              message: 'File sucessfully removed',
              data: { },
              statusCode: 200
            }     
            res.status(200).json(data)
         }

      } catch (error: any) {
         const err = JSON.parse(error.message)
         const errMsg = err.message 
         const code = err.statusCode
      
         const data: any = 
         {
           message: errMsg,
           data: { },
           statusCode: code
         }
         res.status(code).json(data)
      }
    }

    private download = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try 
        {
           const ImagePath = req.params.imagePath
           const DownloadImage = await this.imageService.download(ImagePath)

           const data: { message: string, data: object, statusCode: number } = 
           {
              message: 'download successful',
              data: DownloadImage,
              statusCode: 200
           }
           res.status(200).json(data)

        } catch (error: any) {
           const err = JSON.parse(error.message)
           const errMsg = err.message 
           const code = err.statusCode
            
           const data: any = 
           {
              message: errMsg,
              data: { },
              statusCode: code
           }
           res.status(code).json(data)
        }
    }

}

export default ImageController;