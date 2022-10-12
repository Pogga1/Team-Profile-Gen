const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name,id,email);
        this.officeNumber = officeNumber
    }
    checkOfficeNumber(){
        return this.officeNumber
    }

    checkRole(){
        return 'Manager';
    }
}
module.exports = Manager;