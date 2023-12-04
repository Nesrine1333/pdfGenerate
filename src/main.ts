import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); 

  // Enable CORS
  app.use(
    cors({
      origin: 'http://localhost:5173', // Replace with your frontend URL
      credentials: true, // Enable sending cookies and other credentials
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    }),
  );
  // This allows all origins, methods, and headers. Adjust as needed.
  await app.listen(3000);
}
bootstrap();
