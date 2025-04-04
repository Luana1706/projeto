export class Cliente{
    private id: string;
    private nome: string;
    private email: string;
    private telefone:string;
    private endereco: string;
    private cidade: string;

    constructor (id: string, nome:string,email:string, telefone:string,endereco:string, cidade:string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cidade = cidade;

    }
    
    getnome(): string{
        return this.nome
    }

    getId(): string {
        return this.id
    }
    getEmail(): string {
        return this.email
    }
    getTelefone(): string {
        return this.telefone
    }
    getendereco(): string {
        return this.endereco
    }
    getcidade(): string {
        return this.cidade
    }


}