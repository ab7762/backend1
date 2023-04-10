import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Mikropalvelun tulos näkyy osoitteessa localhost:3000/ping-a

  @Get('/ping-a')
  pingServiceA() {
    return this.appService.pingServiceA();
  }

  @Get('/ping-b')
  pingServiceB() {
    return this.appService.pingServiceB();
  }
  // Palauttaa molemmat mikropalvelut oliona
  @Get('/get-all')
  pingAll() {
    return zip(
      this.appService.RocketService(),
      this.appService.SumService(),
    ).pipe(
      map(([RocketService, SumService]) => ({
        RocketService,
        SumService,
      })),
    );
  }

  @Get('/rocket')
  RocketService() {
    return this.appService.RocketService();
  }

  @Get('/sum')
  SumService() {
    return this.appService.SumService();
  }
}
