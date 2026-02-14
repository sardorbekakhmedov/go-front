
export class User1 {
    id: number = 0;
    name: string | undefined;
    age: number | undefined;
    role: string | undefined;

    constructor(id: number, name: string, age: number, role: string) {
        this.id = id
        this.name = name
        this.age = age
        this.role = role
    }
}
