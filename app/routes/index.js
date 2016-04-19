'use strict';

module.exports = function(app) {
    app.route('/').get(function(req,resp) {
        resp.sendFile(process.cwd() + '/public/index.html');        
    });
};