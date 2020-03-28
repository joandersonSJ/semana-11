const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback();//zera o banco de dados pra não deixar ele pesado ou atrapalhar
    await connection.migrate.latest();
  })

  afterAll( async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    // .set('Authorization', 'id da ong') -- vai setar o Authorization do header
    .send({
      name : "Ong 4",
      email: "contato5@gmail.com",
      whatsapp: "71982868468",
      city: "candeiass",
      uf: "BA"
    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
})