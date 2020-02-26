//testar server.js med hjälp av supertest 
//server testing 
const supertest = require("supertest"); 
const {app, port} = require("../src/server"); 


describe("Simple test if it works", ()=> {
    let server //definierar server i vårt scope för återanvändning 

        beforeEach(()=> {
            server = app.listen(port, ()=> console.log("Testing server if it is up")); 
        }) 

        it("Should respond to /productpage", (done)=> {
            //kontrollerar om vår get-request i server.js svarar 
            supertest(server).get("/productpage").expect(200, done); 
        })

        it("Should respond to /product", (done)=> {
            supertest(server).get("/product").expect(200, done); 
        })

        it("Should responde to post /product", (done)=> {
            supertest(server).post("/product").expect(200, done)
        })

        afterEach((done)=> {
            server.close(done); 
        })

})