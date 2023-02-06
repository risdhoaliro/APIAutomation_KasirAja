const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;
const { ADD_CUSTOMERS, UPDATE_CUSTOMERS } = require("../../data/userData");
const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1MjMyNDczLTg3OGItNDVkMi04OTcyLTI1ZGE2ZTYzMGI3MSIsImNvbXBhbnlJZCI6ImQ0NjNmNmMwLWMxZTQtNDRkOC04NTNiLWZkOGUzYTE1NjhiNiIsImlhdCI6MTY3NTE4MTQzNH0.WU3Fiearm58hjz6wDaEZG-LrE26GDuVJlVU-JJ2z47c";

describe("POST /customers", function () {
  it("Add Customers", async function () {
    const response = await request.post("/customers").set({ Authorization: AUTH }).send({
      name: ADD_CUSTOMERS.name,
      phone: ADD_CUSTOMERS.phone,
      address: ADD_CUSTOMERS.address,
      description: ADD_CUSTOMERS.description,
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

    if (response.status === "success") {
      expect(response).to.have.property("message").that.eql("Customer berhasil ditambahkan");
      expect(response).to.have.property("data").that.deep.equals({
        customerId: "a4d1cf3c-f714-4d04-b258-0eff0e7cfd55",
        name: "Risdho",
      });
    } else {
      expect(response).to.have.property("status").that.eql("fail");
      expect(response).to.have.property("message");
    }
  });
});

describe("GET /customers/78ee9e22-6bda-49e7-92a1-14b5b6963220", function () {
  it("Customers Detail", async function () {
    const response = await request.get("/customers/78ee9e22-6bda-49e7-92a1-14b5b6963220").set({ Authorization: AUTH });

    //-- respomse status OK
    if (response.statusCode > 200) {
      console.log("API response failed with status code:", response.statusCode);
      expect(response.statusCode).to.be.lessThan(200);
    } else {
      console.log("API response successful with status code:", response.statusCode);
      expect(response.statusCode).to.equal(200);
    }

    //-- displays data body
    console.log(response.body);

    if (response.statusCode >= 200 && response.statusCode < 201) {
      expect(response.body).to.have.property("status").that.is.a("string");
      expect(response.body).to.have.property("data").that.is.an("object");
    } else {
      // handle the case for other status values
      expect(response.statusCode).to.not.be.within(200, 201);
    }

    if (response.body.status === "success") {
      expect(response.body.data).to.have.property("customer").that.is.an("object");
      expect(response.body.data.customer).to.have.property("name").that.is.a("string");
      expect(response.body.data.customer).to.have.property("phone").that.is.a("string");
      expect(response.body.data.customer).to.have.property("address").that.is.a("string");
      expect(response.body.data.customer).to.have.property("description").that.is.a("string");
    } else {
      // handle the case for non-success status codes
      expect(response.body).to.not.have.property("status");
    }

    // Assert Negative Case
    // expect(response).to.have.property("status").that.eql("fail");
    // expect(response).to.not.have.property("data");
  });
});

describe("PUT /customers/78ee9e22-6bda-49e7-92a1-14b5b6963220", function () {
  it("Update Customers", async function () {
    const response = await request.put("/customers/78ee9e22-6bda-49e7-92a1-14b5b6963220").set({ Authorization: AUTH }).send({
      name: UPDATE_CUSTOMERS.name,
      phone: UPDATE_CUSTOMERS.phone,
      address: UPDATE_CUSTOMERS.address,
      description: UPDATE_CUSTOMERS.description,
    });

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

    if (response.statusCode >= 200 && response.statusCode < 201) {
      expect(response.body).to.have.property("status").that.is.a("string");
      expect(response.body).to.have.property("data").that.is.an("object");
    } else {
      // handle the case for other status values
      expect(response.statusCode).to.not.be.within(200, 201);
    }

    // Assert Negative Case
    //  expect(response).to.have.property("status").that.equals("fail");
    //  expect(response).to.not.have.property("data");
  });
});

describe("DELETE /customers/064a4e69-2046-4258-8960-bf6bd4e07804", function () {
  it(" Delete Customers", async function () {
    const response = await request.delete("/customers/064a4e69-2046-4258-8960-bf6bd4e07804").set({ Authorization: AUTH });

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

    if (response.statusCode >= 200 && response.statusCode < 201) {
      expect(response.body).to.have.property("status").that.is.a("string");
      expect(response.body).to.have.property("data").that.is.an("object");
    } else {
      // handle the case for other status values
      expect(response.statusCode).to.not.be.within(200, 201);
    }

    // Assert Negative Case
    //  expect(response).to.have.property("status").that.equals("fail");
  });
});
