const genericBodyHandler = require("../lib/generic-body-handler");
const companyId = 1;
const valueConverter = require("../lib/value-converter");

module.exports = function(service, connectorName, validate) {
    service.get('/mobile/custom/ats/clinic', validate, function(req, res) {
        var oracleMobile = req.oracleMobile;
        var lang = req.get("language") === "ar" ? 2 : 1;
        oracleMobile.connectors.get(connectorName, `serviceWS/getClinics/${companyId}/${lang}`)
            .then(
                function(result) {
                    var body = genericBodyHandler(result.result);
                    body.forEach((item) => { valueConverter(item) });
                    res.status(200).json(body);
                },
                function(error) {
                    var body = genericBodyHandler(error.error);
                    res.status(error.statusCode).json(body);
                }
            );
    });

};
