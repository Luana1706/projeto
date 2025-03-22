import { Pool } from "pg";
import { Database } from "./Database";

import { Cliente } from "../entity/Cliente";

export class ClienteRepository {

    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();

    }
    async listaClientes(): Promise<Cliente[]> {
      
        const query = "SELECT *FROM SISTEMA.CADASTRO_RESPONSAVEL";
        const result = await this.pool.query(query);

        const listaClientes: Cliente[] = [];

        for (const row of result.rows) {
            const cliente = new Cliente(row.id, row.nome, row.email, row.cidade, row.telefone, row.endereco);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
 public async buscarPorId(id: string): Promise<Cliente[]> {
    let query = "SELECT* SISTEMA.CADASTRO_RESPONSAVEL WHERE ID=$1"
    let result = await this.pool.query(query,[id])
    const listaClientes: Cliente[] = [];

    for (const row of result.row){

        const cliente = new Cliente(row.id, row.nome, row.email, row.telefone, row.endereco, row.cidade,)
        listaClientes.push(cliente)
       
    }
    return listaClientes
 } 
 public async inserirCliente( id: string, nome: string, email:string, telefone: string, endereco: string, cidade:string ){
    let query = "INSERT INTO  SISTEMA.CADASTRO_RESPONSAVEL (id, nome, email, telefone, endereco, cidade ) VALUES ($1,$2,$3,$4,$5,$6)"
    await this.pool.query(query, [id, nome, email, telefone, endereco, cidade]);
 }
}


