import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [(process.env.APP_URL ?? 'http://localhos:3333/')],
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('Produtos Widgets API')
    .setDescription('API que gerencia produtos, skus, categorias e gerenciadores.')
    .setVersion('1.0')
    .addTag('products-widget')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
