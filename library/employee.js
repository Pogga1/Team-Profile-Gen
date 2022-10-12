class Employee {
    constructor (name, id, email){
        this.name=name
        this.id=id
        this.email=email
    }
    checkName(){
        return this.name
    }
    checkId(){
        return this.id
    }
    checkEmail(){
        return this.email
    }
    checkRole(){
        return 'Employee';
    }
};




module.exports = Employee;