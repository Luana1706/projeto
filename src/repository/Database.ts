import { Pool } from "pg";

export class Database {

    static pool: Pool
    static iniciarConexao(): Pool {

        this.pool = new Pool({

            user: 'postgres',
            password: 'tvantena',
            host: 'localhost',
            database: 'projeto_integrador',
            port: 5432
        });
        return this.pool;
    }
}