/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { app } from '../../../main/http/rest/app';

describe('Create Category Controller', () => {
  it('should be able to list all categories', async () => {
    const response = await request(app).get('/');

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  //   it('should return 401 if token not provided', async () => {
  //     const response = await request(app).post('/categories/').send({
  //       name: 'category',
  //       description: 'description category',
  //     });

  //     expect(response.status).toBe(401);
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         error: 'Token not provided',
  //       })
  //     );
  //   });
  //   it('should return 201 if category is created', async () => {
  //     const response = await request(app).post('/categories/').send({
  //       name: 'category',
  //       description: 'description category',
  //     });

  //     expect(response.status).toBe(201);
  //   });
});
