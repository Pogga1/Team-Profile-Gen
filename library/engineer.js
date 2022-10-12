const Employee=require('./Employee')

class Engineer extends Employee{
    constructor(name, id, email, github){
        super(name,id,email);
        this.github =github
    }
    checkGithub(){
        return this.github
    }
    checkRole(){
        return 'Engineer';
    }
}



module.exports = Engineer;