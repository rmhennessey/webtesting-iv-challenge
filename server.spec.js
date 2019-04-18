const server = require('./server');
const request = require('supertest');

const users = [
        {id: 1, name: "Rory", role: "student"},
        {id: 2, name: "Josh", role: "student"},
        {id: 3, name: "Germanicus", role: "student"},
        {id: 4, name: "Rem", role: "student"}
]

describe('server.js', () => {
    describe('GET /', () => {
        it('should respond with 200 OK', () => {
            return request(server)
                .get('/')
                .then(response => {
                    expect(response.status).toBe(200);
            });
        });  

        it("should return a response body", async () => {
            const response = await request(server).get("/");
            expect(response.body).toEqual(users);
            });

        it("should return a JSON object", async () => {
            const response = await request(server).get("/");
            expect(response.type).toBe("application/json");
            });
        });

    describe("POST to /", () => {
        it("should return a status code of 201", async () => {
            const response = await request(server)
                .post("/")
                .send({ id: 5, name: "KLH" });
                    expect(response.status).toEqual(201);
            });
            it("should return a status code of 500", async () => {
              const response = await request(server)
                .post("/")
                .send({ id: 5, name:"" }); //fails bc there is no name
              expect(response.status).toEqual(500);
            });
            it("should return posted data in the response body", async () => {
              const expectedBody = { id: 5, name: "KLH" };
              const response = await request(server)
                .post("/")
                .send(expectedBody);
              expect(response.body).toEqual(expectedBody);
            });
            it("should return a JSON object", async () => {
              const expectedBody = { id: 5, name: "KLH" };
              const response = await request(server)
                .post("/")
                .send(expectedBody);
              expect(response.type).toBe("application/json");
            });
          });
          describe("DELETE /:id", () => {
            it("should return a status code of 200 when successfully deleted", async () => {
              const response = await request(server).delete("/1");
              expect(response.status).toEqual(200);
            });
            it("should return the ID of the deleted item", async () => {
              const expectedBody = { id: 1 };
              const response = await request(server)
                .delete("/1")
                .send({ id: "1" });
              expect(response.body).toEqual({ id: "1" });
            });
            it("should return a JSON object", async () => {
              const response = await request(server)
                .delete("/1")
                .send({ id: "1" });
              expect(response.type).toBe("application/json");
            });
          });
        
    });


