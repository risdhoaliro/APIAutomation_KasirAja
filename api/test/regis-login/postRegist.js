const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const { REGISTER_TOKO, LOGIN_TOKO } = require("../../data/userData");

describe("POST /registration", function () {
  it("regist toko", async function () {
    const response = await request.post("/registration").send({
      name: REGISTER_TOKO.name,
      email: REGISTER_TOKO.email,
      password: REGISTER_TOKO.password,
    });

    //-- respomse status
    if (response.statusCode > 201) {
      console.log("API response failed with status code:", response.statusCode);
      expect(response.statusCode).to.be.lessThan(201);
    } else {
      console.log("API response successful with status code:", response.statusCode);
      expect(response.statusCode).to.eql(201);
    }
    //-- response data body
    console.log(response.body);
    expect(response.body).to.have.property("status").eql("success");
    expect(response.body).to.have.property("message").eql("Toko berhasil didaftarkan");
  });

  describe("POST /authentications", function () {
    it("login toko", async function () {
      const response = await request.post("/authentications").send({
        email: LOGIN_TOKO.email,
        password: LOGIN_TOKO.password,
      });

      //-- respomse status
      if (response.statusCode > 201) {
        console.log("API response failed with status code:", response.statusCode);
        expect(response.statusCode).to.be.lessThan(201);
      } else {
        console.log("API response successful with status code:", response.statusCode);
        expect(response.statusCode).to.eql(201);
      }
      //-- response data body
      console.log(response.body);
      expect(response.body).to.have.property("status").eql("success");
      expect(response.body).to.have.property("message").eql("Authentication berhasil ditambahkan");
    });
  });
});
