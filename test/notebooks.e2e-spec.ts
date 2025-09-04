import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('NotebooksController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ notebooks (GET)', () => {
    return request(app.getHttpServer())
      .get('/notebooks')
      .expect(200)
      .expect([]);
  });
  afterAll(async () => {
    await app.close(); 
  });
describe('Notebooks', () => {
    it('/notebooks (POST)', async () => {
      const notebook = { title: 'New Notebook', content: 'Notebook content' };

    const response =  await request(app.getHttpServer())
      .post('/notebooks')
      .send(notebook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(notebook.title);
    expect(response.body.content).toBe(notebook.content);
  });
  });



});
