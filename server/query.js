"use strict";
var exports = module.exports = {

    q: function(str) {
        return "'" + str.replace("'","''") + "'";
    },

    getBrokerById: function(sql, id, onsuccess, onerror, onnotfound) {

        var request = new sql.Request();
        request.query('select top 1 * from dbo.hzBrokers where Id = ' + id, function(err, recordset) {

            // err or not found
            if (err) onerror(err);
            else if (recordset.length == 0) onnotfound("Err 404: Broker not found with id=" + id);

            else onsuccess(recordset[0]);
        });
    },

    getBrokers: function(sql, onsuccess, onerror, onnotfound) {

        var qstring = 'select * from dbo.hzBrokers order by name';
        console.log(qstring);

        var request = new sql.Request();
        request.query(qstring, function(err, recordset) {

            // err or not found
            if (err) onerror(err);
            else if (recordset.length == 0) onnotfound("Err 404: Broker not found with id=" + id);

            else onsuccess(recordset);
        });
    },



    getClientById: function(sql, id, onsuccess, onerror, onnotfound) {
        var qstring = 'select top 1 * from dbo.hzClients where Id = ' + id;
        console.log(qstring);

        var request = new sql.Request();
        request.query(qstring, function(err, recordset) {

            // err or not found
            if (err) onerror(err);
            else if (recordset.length == 0) onnotfound("Err 404: Client not found with id=" + id);

            else onsuccess(recordset[0]);
        });
    },

    getClients: function(sql, onsuccess, onerror, onnotfound) {
        var qstring = 'select * from dbo.hzClients order by GroupNo';
        console.log(qstring);

        var request = new sql.Request();
        request.query(qstring, function(err, recordset) {

            // err or not found
            if (err) onerror(err);
            else if (recordset.length == 0) onnotfound("Err 404: No Clients found :(");

            else onsuccess(recordset);
        });
    },

    getClientByGroupNumber: function(sql, groupNumber, onsuccess, onerror, onnotfound) {

        var request = new sql.Request();
        request.query('select top 1 * from dbo.hzClients where GroupNo = ' + this.q(groupNumber), function(err, recordset) {

            // err or not found
            if (err) onerror(err);
            else if (recordset.length == 0) onnotfound("Err 404: Client not found with GroupNo=" + id);

            else onsuccess(recordset[0]);
        });
    },

};

