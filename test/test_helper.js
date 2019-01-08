const mongoose = require('mongoose');

beforeEach(function(done) {
    this.timeout(10000);
    mongoose.connect('mongodb://localhost/HandPickedTest', function(){
        mongoose.connection.db.dropDatabase(() => {
            console.log('Cleaning - test database dropped');
            done();
        });
    });
});