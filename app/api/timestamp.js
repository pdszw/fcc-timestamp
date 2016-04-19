'use strict';

var moment = require('moment');

module.exports = function(app) {
    app.get('/:query', function(req,resp) {
        var dateQueried = req.params.query;
        var dateUnix = null;
        var dateNatural = null;
        
        // if dateQueried is unix timestamp (number greater than 1970-01-01)
        if (+dateQueried >= 0) {
            dateUnix = +dateQueried;
            dateNatural = convertUnixToNatural(dateUnix);
        }
        
        // if dateQueried is not a number (and passes
        // moment validation for MMMM D, YYYY format
        // eg. January 1, 1970)
        if (isNaN(+dateQueried) && moment(dateQueried, "MMMM D, YYYY").isValid) {
            dateUnix = convertNaturalToUnix(dateQueried);
            dateNatural = convertUnixToNatural(dateUnix);
        }
        
        var resultObject = {
            "unix": dateUnix,
            "natural": dateNatural
        };
        
        resp.send(JSON.stringify(resultObject));
        
    });
    
    function convertNaturalToUnix(input) {
        return moment(input, "MMMM D, YYYY").format("X");
    }
    
    function convertUnixToNatural(input) {
        return moment.unix(input).format("MMMM D, YYYY");
    }
}