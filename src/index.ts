import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import AuthController from '@/controller/auth.controller';
import ImageController from '@/controller/image.controller';

validateEnv();

const app = new App(
    [
        new AuthController(),
        new ImageController()
    ], 
    Number(process.env.PORT)
);

app.listen();