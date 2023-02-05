const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const { ADD_PRODUCTS, UPDATE_PRODUCTS } = require("../../data/userData");
const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1MjMyNDczLTg3OGItNDVkMi04OTcyLTI1ZGE2ZTYzMGI3MSIsImNvbXBhbnlJZCI6ImQ0NjNmNmMwLWMxZTQtNDRkOC04NTNiLWZkOGUzYTE1NjhiNiIsImlhdCI6MTY3NTE4MTQzNH0.WU3Fiearm58hjz6wDaEZG-LrE26GDuVJlVU-JJ2z47c";

describe("POST /products", function () {
  it("add products", async function () {
    const response = await request.post("/products").set({ Authorization: AUTH }).send({
      category_id: ADD_PRODUCTS.category_id,
      code: ADD_PRODUCTS.code,
      name: ADD_PRODUCTS.name,
      price: ADD_PRODUCTS.price,
      cost: ADD_PRODUCTS.cost,
      stock: ADD_PRODUCTS.stock,
    });

    //-- respomse status
    if (response.statusCode > 201) {
      console.log("API response failed with status code:", response.statusCode);
      expect(response.statusCode).to.be.lessThan(201);
    } else {
      console.log("API response successful with status code:", response.statusCode);
      expect(response.statusCode).to.equal(201);
    }
    //-- response data body
    console.log(response.body);
    expect(response.body).to.have.property("status").eql("success");
    // expect(response.body).to.have.property("message").eql("Product berhasil ditambahkan");
    // expect(response.body.data.name).to.eql("gudeg jogja");
  });

  describe("GET /products/99bf6746-0a3b-4460-9f1a-09e2b77ac3bd", function () {
    it("products detail", async function () {
      const response = await request.get("/products/99bf6746-0a3b-4460-9f1a-09e2b77ac3bd").set({ Authorization: AUTH });

      //-- respomse status
      if (response.statusCode > 200) {
        console.log("API response failed with status code:", response.statusCode);
        expect(response.statusCode).to.be.lessThan(200);
      } else {
        console.log("API response successful with status code:", response.statusCode);
        expect(response.statusCode).to.equal(200);
      }
      //-- displays data body
      console.log(response.body);
      expect(response.body).to.have.property("status").eql("success");
    });

    describe("PUT /products/99bf6746-0a3b-4460-9f1a-09e2b77ac3bd", function () {
      it("update products", async function () {
        const response = await request.put("/products/99bf6746-0a3b-4460-9f1a-09e2b77ac3bd").set({ Authorization: AUTH }).send({
          category_id: UPDATE_PRODUCTS.category_id,
          code: UPDATE_PRODUCTS.code,
          name: UPDATE_PRODUCTS.name,
          price: UPDATE_PRODUCTS.price,
          cost: UPDATE_PRODUCTS.cost,
          stock: UPDATE_PRODUCTS.stock,
        });

        //-- respomse status
        if (response.statusCode > 200) {
          console.log("API response failed with status code:", response.statusCode);
          expect(response.statusCode).to.be.lessThan(200);
        } else {
          console.log("API response successful with status code:", response.statusCode);
          expect(response.statusCode).to.equal(200);
        }
        //-- display data body
        console.log(response.body);
        //-- check response is success
        if (response.status >= 200 && response.status < 300) {
          //-- check API response body contains the expected properties
          expect(response.body).to.have.property("status").eql("success");
          expect(response.body.message).to.eql("Product berhasil diupdate");
        } else {
          console.error("API response failed with status code:", response.status);
        }
      });

      describe("DELETE /products/32a9b38a-e5b6-48b4-ab2a-0f6066e5c449", function () {
        it("delete detail", async function () {
          const response = await request.delete("/products/32a9b38a-e5b6-48b4-ab2a-0f6066e5c449").set({ Authorization: AUTH });

          //-- respomse status
          if (response.statusCode > 200) {
            console.log("API response failed with status code:", response.statusCode);
            expect(response.statusCode).to.be.lessThan(200);
          } else {
            console.log("API response successful with status code:", response.statusCode);
            expect(response.statusCode).to.equal(200);
          }
          //-- displays data body
          console.log(response.body);
          expect(response.body).to.have.property("status").eql("success");
        });
      });
    });
  });
});
