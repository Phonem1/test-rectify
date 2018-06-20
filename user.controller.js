class UserController {
    constructor() {
        this._storage = [];
    }

    sendexamplelogin() {
        return {
            'userId' : 395882,
            'password' : 'xyz',
            'maxResponseSeconds': 10
        };
    }

    responseexampleloginifsuccess() {
        return {
            'errorFlag':false,
            'errorCode':0,
            'errorMessage':'Success',
            'globalID':'395882',
            'firstName':'Raja Pandian',
            'lastName':'Veeraiah',
            'emailID':'rajapandian.veeraiah@test.com',
            'contactNumber':'+65  64125446',
            'fullName':'Raja Pandian Veeraiah',
            'GIDAndName':'395882 - Raja Pandian Veeraiah',
            'iGlobalID':395882
        };
    }

    _findUserById(id, password = null) {
        if ( !password ) {
            const user = this._storage.find(user =>user.globalID === id);
            if (!user) {                
                return '';
            }  
            return user;
        } 

        const user = this._storage.find(user => user.globalID === id && user.password === password);
        if(!user) {            
            return '';
        }
        return user;        
    }
   

    getAllUsers() {
        return this._storage;
    }
    getUserById(id) {
        return this._findUserById(id);
    }
    create() {
        this._storage = [];
        const newUser1 = {
                'password':'1234',
                'globalID':'395882',
                'firstName':'Raja Pandian',
                'lastName':'Veeraiah',
                'emailID':'rajapandian.veeraiah@test.com',
                'contactNumber':'+65  64125446',
                'fullName':'Raja Pandian Veeraiah',
                'GIDAndName':'395882 - Raja Pandian Veeraiah',
                'iGlobalID':395882
            };
        const newUser2 = {
                'password':'1234',
                'globalID':'395883',
                'firstName':'Robert',
                'lastName':'Ros',
                'emailID':'robert.ros@test.com',
                'contactNumber':'+65  64125447',
                'fullName':'Robert Ros',
                'GIDAndName':'395883 - Robert Ros',
                'iGlobalID':395883
            };
        const newUser3 = {
                'password':'1234',
                'globalID':'395884',
                'firstName':'Vidya',
                'lastName':'Pradeep',
                'emailID':'vidya.pradeep@test.com',
                'contactNumber':'+65  64125448',
                'fullName':'Vidya Pradeep',
                'GIDAndName':'395884 - Vidya Pradeep',
                'iGlobalID':395884
            };
        this._storage.push(newUser1);
        this._storage.push(newUser2);
        this._storage.push(newUser3);
    }

    login(id, password) {    
        return this._findUserById(id, password);
    }
}
module.exports = new UserController();