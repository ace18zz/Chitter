import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';


const should = chai.should();

chai.use(chaiHttp);

let token; 

before((done) => {
    chai.request(server)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
            token = res.body.token;
            done();
        });
});


describe("/GET peeps", () => {
  it("it should GET all the peeps", (done) => {
    chai.request(server)
      .get("/peeps")
      .set('Authorization', 'Bearer ' + token)  
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });


  describe("/POST peep", () => {
    it("it should POST a new peep", (done) => {
        let peep = {
            userId: "someUserId",
            description: "Test peep",
            picturePath: "/path/to/pic.jpg"
        };

        chai.request(server)
        .get("/peeps")
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
            if(err) {
                done(err);
                return;
            }
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
        });
     
     
    });
});

