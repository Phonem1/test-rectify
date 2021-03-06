class DataController {
    constructor() {
        this._storage = [];
    }

    sendexamplesubmit() {
        return {
            'Cage_ID':'CID001',
            'CELL_ID': 'CELL 7',
            'userid':395882 ,
            'fromTime':'yyyy-mm-dd hh24:mi:ss' ,
            'toTime':'yyyy-mm-dd hh24:mi:ss', 
            'cleaningStatus':'Pass/Fail'
        };
    }
 
    responseexamplesubmitifsuccess() {
        return {
            'errorFlag':false,
            'errorCode':0,
            'errorMessage':'Success'

        };
    }

    getAll() {
        return this._storage;
    }
    
    create(cageid, cellid, userid, fromtime, totime, cleaningstatus) {
        const newData = {
            Cage_ID : cageid,
            CELL_ID: cellid,
            userid : userid,
            fromTime : fromtime,
            toTime : totime,
            cleaningStatus : cleaningstatus
        };
        this._storage.push(newData);
    }
}
module.exports = new DataController();