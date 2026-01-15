
export class User1 {
    id: number = 0;
    name: string | undefined;
    age: number | undefined;

    constructor(id: number, name: string, age: number) {
        this.id = id
        this.name = name
        this.age = age
    }
}
