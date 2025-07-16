const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
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
  await Item.deleteMany({});
});

describe('/api/items integration', () => {
  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Milk' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Milk');
    expect(res.body.purchased).toBe(false);
  });

  it('should get all items', async () => {
    await Item.create({ name: 'Bread' });
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Bread');
  });

  it('should update an item', async () => {
    const item = await Item.create({ name: 'Eggs' });
    const res = await request(app)
      .patch(`/api/items/${item._id}`)
      .send({ purchased: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.purchased).toBe(true);
  });

  it('should delete an item', async () => {
    const item = await Item.create({ name: 'Juice' });
    const res = await request(app).delete(`/api/items/${item._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Item deleted');
  });
}); 