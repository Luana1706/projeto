import promptSync from 'prompt-sync';
import { ClienteService } from '../service/ClienteService';

export class ClienteView {
    private clienteService: ClienteService;
    private prompt: any;

    constructor() {
        this.clienteService = new ClienteService();
        this.prompt = promptSync();
    }

    public async exibirMenu(): Promise<void> {
        let opcao: string;

        do {
            console.log("+********************************+");
            console.log("|          Cliente Menu          |");
            console.log("+################################+");
            console.log("| 1. Inserir Cliente             |");
            console.log("| 2. Listar Clientes             |");
            console.log("| 3. Buscar Cliente por ID       |");
            console.log("| 4. Deletar Cliente             |");
            console.log("| 5. Atualizar Cliente           |");
            console.log("| 0. Sair                        |");
            console.log("+********************************+");

            opcao = this.prompt('Escolha uma Opção: ');

            switch (opcao) {
                case '1':
                    await this.inserirCliente();
                    break;

                case '2':
                    await this.listarClientes();
                    break;

                case '3':
                    await this.buscarClientePorId();
                    break;

                case '4':
                    await this.deletarCliente();
                    break;

                case '5':
                    await this.atualizarCliente();
                    break;

                case '0':
                    console.log("Saindo...");
                    break;

                default:
                    console.log("Opção inválida! Tente novamente.");
            }
        } while (opcao !== '0');
    }

    private async inserirCliente(): Promise<void> {
        const id = this.prompt('Id do Cliente: ');
        const nome = this.prompt('Nome do Cliente: ');
        const email = this.prompt('Email do Cliente: ');
        const telefone = this.prompt('Telefone do Cliente: ');
        const endereco = this.prompt('Endereço do Cliente: ');
        const cidade = this.prompt('Cidade do Cliente: ');

        try {
            await this.clienteService.inserirClientes(id, nome, email, telefone, endereco, cidade);
            console.log("Cliente inserido com sucesso!");
        } catch (error) {
            console.log("Erro ao inserir cliente:", error.message);
        }
    }

    private async listarClientes(): Promise<void> {
        try {
            const clientes = await this.clienteService.listarClientes();
            if (clientes.length === 0) {
                console.log("Nenhum cliente cadastrado.");
            } else {
                console.table(clientes);
            }
        } catch (error) {
            console.log("Erro ao listar clientes:", error.message);
        }
    }

    private async buscarClientePorId(): Promise<void> {
        const idBusca = this.prompt('ID do Cliente: ');
        try {
            const cliente = await this.clienteService.buscarPorId(idBusca);
            if (!cliente) {
                console.log(`Cliente com ID ${idBusca} não encontrado.`);
            } else {
                console.table(cliente);
            }
        } catch (error) {
            console.log("Erro ao buscar cliente:", error.message);
        }
    }

    private async deletarCliente(): Promise<void> {
        const idCliente = this.prompt("Digite o ID do cliente que deseja deletar: ");
        try {
            await this.clienteService.deletarCliente(idCliente);
            console.log("Cliente deletado com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar cliente:", error.message);
        }
    }

    private async atualizarCliente(): Promise<void> {
        const atualizarCliente = String(this.prompt("Digite o ID do cliente que deseja atualizar: "));
        try {
            await this.clienteService.buscarPorId(atualizarCliente);
        } catch (error) {
            console.log("Erro: Cliente não encontrado!");
            return;
        }
    
        const novoEmail = this.prompt("Novo email (deixe em branco para não alterar): ");
        const novoTelefone = this.prompt("Novo telefone (deixe em branco para não alterar): ");
        const novaRuaNumero = this.prompt("Nova rua e número (deixe em branco para não alterar): ");
        const novoBairroCidade = this.prompt("Novo bairro e cidade (deixe em branco para não alterar): ");
    
        await this.clienteService.atualizarCliente(atualizarCliente,
            novoEmail || undefined,
            novoTelefone || undefined,
            novaRuaNumero || undefined,
            novoBairroCidade || undefined
        );
    
        console.log("Cliente atualizado com sucesso!");
    }

}
