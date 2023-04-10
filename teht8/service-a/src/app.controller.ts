import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  // Kun palveluun tulee viesti "ping" niin metodi ping() suoritetaan, joka palauttaa observablena
  // stringin "pong" sekunnin viiveellä
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return of('pong ').pipe(delay(1000));
  }
}
