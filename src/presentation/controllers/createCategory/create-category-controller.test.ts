/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import { prisma } from '../../../external/database/prisma-service';
import { JwtRepository } from '../../../infra/repositories/jwt-repository';
import { app } from '../../../main/http/rest/app';

const jwtRepository = new JwtRepository();

const authenticate = () => {
  const token = jwtRepository.sign('user-id', {
    email: 'usertest@email.com',
    name: 'name',
    username: 'username',
  });

  return token;
};

const createUser = async () => {
  await prisma.user.create({
    data: {
      id: 'user-id',
      email: 'usertest@email.com',
      name: 'name',
      username: 'username',
      password: 'password',
      driver_license: '12345678',
    },
  });
};

const deleteUser = async () => {
  const user = await prisma.user.findFirst({
    where: {
      email: 'usertest@email.com',
    },
  });

  if (user) {
    await prisma.user.delete({
      where: {
        email: 'usertest@email.com',
      },
    });
  }
};

const deleteCategory = async () => {
  const category = await prisma.category.findFirst({
    where: {
      name: 'category',
    },
  });

  if (category) {
    await prisma.category.delete({
      where: {
        name: 'category',
      },
    });
  }
};

const createCategory = async () => {
  await prisma.category.create({
    data: {
      name: 'category',
      description: 'description',
    },
  });
};

describe('Create Category Controller', () => {
  afterEach(async () => {
    await deleteUser();
    await deleteCategory();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return 401 if token not provided', async () => {
    const response = await request(app).post('/categories/').send({
      name: 'category',
      description: 'description category',
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Token not provided',
      })
    );
  });

  it('should return 401 if token expired', async () => {
    const headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJBZG1pbiBVc2VyIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1MDUxMzU4MSwiZXhwIjoxNjUwNTE3MTgxLCJzdWIiOiI0ZDY4MTU0Ny1iZDgwLTQwMDAtOWZlMS04YTg2Y2JhMjdhZjYifQ.OVMnZIJXf2J5gIKQXc8sgiq0Clb5rvL9eeX-hwX10aQ',
    };

    const body = {
      name: 'category',
      description: 'description category',
    };

    const response = await request(app)
      .post('/categories/')
      .set(headers)
      .send(body);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'jwt expired',
      })
    );
  });

  it('should return 400 if category already exists', async () => {
    await createUser();
    await createCategory();

    const headers = {
      authorization: `Bearer ${authenticate()}`,
    };

    const body = {
      name: 'category',
      description: 'description category',
    };

    const response = await request(app)
      .post('/categories/')
      .set(headers)
      .send(body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Category already exists.',
    });
  });

  it('should be able to create a new category', async () => {
    await createUser();

    const headers = {
      authorization: `Bearer ${authenticate()}`,
    };

    const body = {
      name: 'category',
      description: 'description category',
    };

    const response = await request(app)
      .post('/categories/')
      .set(headers)
      .send(body);

    expect(response.status).toBe(204);
  });
});
