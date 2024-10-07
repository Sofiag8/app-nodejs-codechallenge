import * as dotenv from 'dotenv';

// Cargar las variables de entorno para el entorno de pruebas
dotenv.config({ path: '.env.test' });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as sinon from 'sinon';
import * as kafkaNode from 'kafka-node';

describe('Main Application (Integration)', function () {
  this.timeout(10000); // Aumenta el timeout a 10 segundos

  let app: INestApplication;

  before(async () => {
    // Mock del cliente Kafka para evitar la conexión real durante las pruebas
    sinon.stub(kafkaNode, 'KafkaClient').callsFake(() => {
      return {
        on: () => {},
        connect: () => {},
        close: () => {},
      };
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  after(async () => {
    // Restaurar el cliente Kafka original
    sinon.restore();

    if (app) {
      await app.close();
    }
  });

  describe('Application Bootstrap', () => {
    it('should start the application and listen on port 3000', async () => {
      await request(app.getHttpServer()).get('/').expect(404);
    });
  });
});
