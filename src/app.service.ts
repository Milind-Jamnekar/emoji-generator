import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello World! This is the AppService response.',
      timestamp: new Date().toISOString(),
    };
  }
}
