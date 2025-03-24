import { Cliente } from "../entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService {
  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }

  async listarClientes(): Promise<Cliente[]> {
    const clientes = await this.repo.listarClientes();
    if (clientes.length === 0) {
      throw new Error("Nenhum cliente encontrado");
    }
    return clientes;
  }

  public async buscarPorId(id: number): Promise<Cliente> {
    const lista = await this.repo.buscarPorId(id);
    if (lista.length === 0) {
      throw new Error("Cliente não encontrado");
    }
    return lista[0];
  }

  public async inserirClientes(
    nome: string,
    email: string,
    telefone: string,
    id: string,
    endereco: string,
    cidade: string
  ): Promise<void> {
    await this.repo.inserirCliente(nome, email, telefone, id, endereco, cidade);
    console.log("Cliente inserido com sucesso!");
  }

  public async deletarCliente(id: number): Promise<void> {
    await this.buscarPorId(id); // Verifica se o cliente existe antes de excluir
    await this.repo.deletarCliente(id); // Adiciona a chamada para deletar
    console.log(`Cliente com ID ${id} deletado com sucesso!`);
  }

  public async atualizarCliente(
    id: number,
    email?: string,
    telefone?: string,
    endereco?: string,
    bairro_cidade?: string
  ): Promise<void> {
    const cliente = await this.buscarPorId(id); // Verifica se o cliente existe

    // Mantém os dados antigos caso os novos não sejam fornecidos
    const novoEmail = email || cliente.getEmail();
    const novoTelefone = telefone || cliente.getTelefone();
    const novoEndereco = endereco || cliente.getEndereco();
    const novaCidade = bairro_cidade || cliente.getCidade(); // Corrigido para `cidade`

    await this.repo.atualizarCliente(id, novoEmail, novoTelefone, novoEndereco, novaCidade);

    console.log(`Cliente com ID ${id} atualizado com sucesso!`);
  }
}
