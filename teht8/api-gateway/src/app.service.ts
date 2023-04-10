import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
    @Inject('ROCKET_SERVICE') private readonly clientRocketService: ClientProxy,
    @Inject('SUM_SERVICE') private readonly clientSumService: ClientProxy,
  ) {}
  // ClientServiceA lähettää pyynnön mikropalvelulle ja mikropalvelu vastaa tähän pyyntöön
  pingServiceA() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' }; //Lähetetään service-a:lle
    const payload = {};
    return this.clientServiceA.send<string>(pattern, payload).pipe(
      // Palauttaa viestin sekä toimenpiteen keston
      map((message: string) => ({ message, duration: Date.now() - startTs })),
    );
  }

  pingServiceB() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' }; //Lähetetään service-a:lle
    const payload = {};
    return this.clientServiceB.send<string>(pattern, payload).pipe(
      // Palauttaa viestin sekä toimenpiteen keston
      map((message: string) => ({ message, duration: Date.now() - startTs })),
    );
  }

  RocketService() {
    const pattern = 'get-next-launch-remaining-time'; //Lähetetään rocket-servicelle
    const payload = {};
    return this.clientRocketService.send<string>(pattern, payload).pipe(
      // Palauttaa tiedon
      map((data) => data),
    );
  }
  // Payload muuttujaan tulee taulukko, joka käydään sum-servicessä läpi ja lasketaan yhteen
  SumService() {
    const pattern = { cmd: 'sum' };
    const payload = [10, 10, 20, 30];
    return this.clientSumService
      .send<string>(pattern, payload)
      .pipe(map((data) => data));
  }
}
