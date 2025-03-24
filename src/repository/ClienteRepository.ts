import { Pool } from "pg";
import { Database } from "./Database";
import { Cliente } from "../entity/Cliente";

export class ClienteRepository {
    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    async listarClientes(): Promise<Cliente[]> {
        const query = "SELECT * FROM SISTEMA.CADASTRO_RESPONSAVEL";
        const result = await this.pool.query(query);

        return result.rows.map(row => new Cliente(row.id, row.nome, row.email, row.cidade, row.telefone, row.endereco));
    }

    public async buscarPorId(id: string): Promise<Cliente[]> {
        const query = "SELECT * FROM SISTEMA.CADASTRO_RESPONSAVEL WHERE ID = $1";
        const result = await this.pool.query(query, [id]);

        return result.rows.map(row => new Cliente(row.id, row.nome, row.email, row.cidade, row.telefone, row.endereco));
    }

    public async inserirCliente(id: string, nome: string, email: string, telefone: string, endereco: string, cidade: string): Promise<void> {
        const query = "INSERT INTO SISTEMA.CADASTRO_RESPONSAVEL (id, nome, email, telefone, endereco, cidade) VALUES ($1, $2, $3, $4, $5, $6)";
        await this.pool.query(query, [id, nome, email, telefone, endereco, cidade]);
    }
    public async atualizarCliente(
        id: number,
        email: string,
        telefone: string,
        endereco: string,
        cidade: string
    ): Promise<void> {
        const query = `
            UPDATE PROJETO.CADASTROCLIENTES
            SET email = $1, telefone = $2, endereco = $3, cidade = $4
            WHERE id = $5
        `;

        const result = await this.pool.query(query, [email, telefone, endereco, cidade, id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }
    }

    public async deletarCliente(id: number): Promise<void> {
        const query = `
            DELETE FROM PROJETO.CADASTROCLIENTES
            WHERE id = $1
        `;

        const result = await this.pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }
    }
}
