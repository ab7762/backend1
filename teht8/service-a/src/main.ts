// Main.ts on sovelluksen käynnistystiedosto

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// Tehdään sovelluksesta micro-palvelu
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP, // Käyttää TCP-protokollaa tiedonsiirtoon gatewayn suuntaan
    options: {
      host: '127.0.0.1',
      port: 8890, // Mikropalvelun portti
    },
  });
  app.listen();
  console.log('Service-a is listening port 8888');
}
bootstrap();
