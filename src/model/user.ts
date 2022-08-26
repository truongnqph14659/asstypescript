class User {
    name?: string;
    phone?: number;
    email: string;
    password: string;
    role?:number;
    constructor(
        name: string,
        phone: number,
        email: string,
        password: string,
        role:number) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role
    }
}
export default User