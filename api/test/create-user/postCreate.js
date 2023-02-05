const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const { CREATE_USER } = require("../../data/userData");
const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1MjMyNDczLTg3OGItNDVkMi04OTcyLTI1ZGE2ZTYzMGI3MSIsImNvbXBhbnlJZCI6ImQ0NjNmNmMwLWMxZTQtNDRkOC04NTNiLWZkOGUzYTE1NjhiNiIsImlhdCI6MTY3NTE4MTQzNH0.WU3Fiearm58hjz6wDaEZG-LrE26GDuVJlVU-JJ2z47c";

describe("POST /users", function () {
  it("create kasir", async function () {
    const response = await request.post("/users").set({ Authorization: AUTH }).send({
      name: CREATE_USER.name,
      email: CREATE_USER.email,
      password: CREATE_USER.password,
    });

    //-- respomse status
    expect(response.status).to.eql(201);
    //-- response data body
    console.log(response.body);
    expect(response.body).to.have.property("status").eql("success");
    expect(response.body).to.have.property("message").eql("User berhasil ditambahkan");
  });
});
