export class RegisterRequest {

    public email: string;
    public username: string;
    public password: string;
    public gender: string;
    public age: number;
    public town: string;
    public district: string;


    constructor(email: string, username: string, password: string, gender: string, age: number, town: string, district: string) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.age = age;
        this.town = town;
        this.district = district;
    }
}