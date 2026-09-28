import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'Enterprise ERP',
      status: 'running',
    };
  }
}
