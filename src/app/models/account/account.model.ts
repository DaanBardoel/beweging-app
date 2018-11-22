export class Account {
    email: string;
    username: string;
    password: string;
    gender: string;
    age: number;
    town: string;
    district: string;


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
