const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const User = require('../../src/models/User');
const Item = require('../../src/models/Item');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
});

describe('Auth and Protected Routes', () => {
  const userData = { email: 'test@example.com', password: 'password123' };

  it('registers a new user and returns a token', async () => {
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('prevents duplicate registration', async () => {
    await request(app).post('/api/auth/register').send(userData);
    const res = await request(app).post('/api/auth/register').send(userData);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('User already exists');
  });

  it('validates registration input', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'bad', password: '123' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('logs in a registered user and returns a token', async () => {
    await request(app).post('/api/auth/register').send(userData);
    const res = await request(app).post('/api/auth/login').send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('prevents login with wrong credentials', async () => {
    await request(app).post('/api/auth/register').send(userData);
    const res = await request(app).post('/api/auth/login').send({ email: userData.email, password: 'wrong' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('prevents access to /api/items without token', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(401);
  });

  it('allows access to /api/items with valid token', async () => {
    await request(app).post('/api/auth/register').send(userData);
    const login = await request(app).post('/api/auth/login').send(userData);
    const token = login.body.token;
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Milk' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Milk');
  });

  it('validates item name on /api/items', async () => {
    await request(app).post('/api/auth/register').send(userData);
    const login = await request(app).post('/api/auth/login').send(userData);
    const token = login.body.token;
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'A' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
}); 