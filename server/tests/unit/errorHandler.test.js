const httpMocks = require('node-mocks-http');
const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  it('should send 500 and default message for generic errors', () => {
    const err = new Error('Something went wrong');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Something went wrong' });
  });

  it('should use err.status if provided', () => {
    const err = new Error('Not found');
    err.status = 404;
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    errorHandler(err, req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: 'Not found' });
  });
}); 