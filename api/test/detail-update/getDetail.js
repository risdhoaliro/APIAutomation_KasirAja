const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const { UPDATE_USER } = require("../../data/userData");
const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1MjMyNDczLTg3OGItNDVkMi04OTcyLTI1ZGE2ZTYzMGI3MSIsImNvbXBhbnlJZCI6ImQ0NjNmNmMwLWMxZTQtNDRkOC04NTNiLWZkOGUzYTE1NjhiNiIsImlhdCI6MTY3NTE4MTQzNH0.WU3Fiearm58hjz6wDaEZG-LrE26GDuVJlVU-JJ2z47c";

describe("GET /users/3409b6ed-93fa-4bc0-8cc7-1dceb8c8781a", function () {
  it("detail kasir", async function () {
    const response = await request.get("/users/3409b6ed-93fa-4bc0-8cc7-1dceb8c8781a").set({ Authorization: AUTH });

    //-- respomse status
    if (response.statusCode > 200) {
      console.log("API response failed with status code:", response.statusCode);
      expect(response.statusCode).to.be.lessThan(200);
    } else {
      console.log("API response successful with status code:", response.statusCode);
      expect(response.statusCode).to.equal(200);
    }
    //-- response data body
    console.log(response.body);
    expect(response.body).to.have.property("status").eql("success");
  });

  describe("PUT /users/3409b6ed-93fa-4bc0-8cc7-1dceb8c8781a", function () {
    it("detail kasir", async function () {
      const response = await request.put("/users/3409b6ed-93fa-4bc0-8cc7-1dceb8c8781a").set({ Authorization: AUTH }).send({
        name: UPDATE_USER.name,
        email: UPDATE_USER.email,
      });

      //-- respomse status
      if (response.statusCode > 200) {
        console.log("API response failed with status code:", response.statusCode);
        expect(response.statusCode).to.be.lessThan(200);
      } else {
        console.log("API response successful with status code:", response.statusCode);
        expect(response.statusCode).to.equal(200);
      }
      //-- response data body
      console.log(response.body);
      expect(response.body).to.have.property("status").eql("success");
      expect(response.body.message).to.eql("User berhasil diupdate");
      expect(response.body.data.name).to.eql("kasir-risdho");
    });
  });
});
