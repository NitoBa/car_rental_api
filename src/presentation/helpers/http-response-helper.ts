import { HttpResponse } from '../interfaces/http-response';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message,
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error.message,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const created = (data?: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
