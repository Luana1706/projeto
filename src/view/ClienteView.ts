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

        console.log("+--------------------------------+");
        console.log("|          Cliente Menu          |");
        console.log("+--------------------------------+");
        console.log("| 1. Inserir Cliente             |");
        console.log("| 2. Listar Clientes             |");
        console.log("| 3. Buscar Cliente por ID       |");
        console.log("| 4. Deletar Cliente             |");
        console.log("| 5. Atualizar Cliente           |");
        console.log("| 0. Sair                        |");
        console.log("+--------------------------------+");

        opcao = this.prompt('Escolha uma Opção: ');

        switch (opcao) {
            case '1':
                const id = this.prompt('Id do Cliente: ');
                const nome = this.prompt('Nome do Cliente: ');
                const email = this.prompt('Email do Cliente: ');
                const telefone = this.prompt('Telefone do Cliente: ');
                const endereco = this.prompt('Endereço do Cliente: ');
                const cidade = this.prompt('Cidade do Cliente: ');

                await this.clienteService.inserirClientes(id, nome, email, telefone, endereco, cidade);
                console.log("Cliente inserido com sucesso!");
                await this.exibirMenu();
                break;

            case '2':
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
                await this.exibirMenu();
                break;

            case '3':
                const idBusca = this.prompt('ID do Cliente: ');
                console.log(await this.clienteService.buscarPorId(Number(idBusca)));
                await this.exibirMenu();
                break;

            case '4':
                const idCliente = this.prompt("Digite o ID do cliente que deseja deletar: ");
                try {
                    await this.clienteService.deletarCliente(Number(idCliente));
                    console.log("Cliente deletado com sucesso!");
                } catch (error) {
                    console.log(error.message);
                }
                await this.exibirMenu();
                break;

            case '5':
                const atualizarCliente = Number(this.prompt("Digite o ID do cliente que deseja atualizar: "));
                
                try {
                    const clienteExistente = await this.clienteService.buscarPorId(atualizarCliente);
                    if (!clienteExistente) {
                        console.log("Erro: Cliente não encontrado!");
                        await this.exibirMenu();
                        return;
                    }
                } catch (error) {
                    console.log("Erro ao buscar cliente:", error.message);
                    await this.exibirMenu();
                    return;
                }

                const novoEmail = this.prompt("Novo email (deixe em branco para não alterar): ");
                const novoTelefone = this.prompt("Novo telefone (deixe em branco para não alterar): ");
                const novoEndereco = this.prompt("Nova rua e número (deixe em branco para não alterar): ");
                const novaCidade = this.prompt("Novo bairro e cidade (deixe em branco para não alterar): ");

                await this.clienteService.atualizarCliente(
                    atualizarCliente,
                    novoEmail || undefined,
                    novoTelefone || undefined,
                    novoEndereco || undefined,
                    novaCidade || undefined
                );

                console.log("Cliente atualizado com sucesso!");
                await this.exibirMenu();
                break;

            case '0':
                console.log("Saindo...");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                await this.exibirMenu();
        }
    }
}
