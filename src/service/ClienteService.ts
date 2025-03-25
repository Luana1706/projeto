import { Cliente } from "../entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService {
  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }

  // Método para listar todos os clientes
  async listarClientes(): Promise<Cliente[]> {
    const clientes = await this.repo.listarClientes();
    return clientes; // Devolver o array de clientes, sem lançar erro
  }

  // Método para buscar um único cliente por ID
  public async buscarPorId(id: string): Promise<Cliente> {
    const cliente = await this.repo.buscarPorId(id); // Retorna um único cliente ou null
    if (!cliente) { // Verifica se o cliente foi encontrado
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  }

  // Método para inserir um novo cliente
  public async inserirClientes(
    nome: string,
    email: string,
    telefone: string,
    id: string,
    endereco: string,
    cidade: string
  ): Promise<void> {
    await this.repo.inserirCliente(nome, email, telefone, id, endereco, cidade);
  }

  // Método para deletar um cliente
  public async deletarCliente(id: string): Promise<void> {
    const cliente = await this.buscarPorId(id); // Verifica se o cliente existe antes de excluir
    await this.repo.deletarCliente(id); // Deleta o cliente
  }

  // Método para atualizar um cliente
  public async atualizarCliente(
    id: string,
    email?: string,
    telefone?: string,
    endereco?: string,
    cidade?: string
  ): Promise<void> {
    const cliente = await this.buscarPorId(id); // Verifica se o cliente existe
  
    // Mantém os dados antigos caso os novos não sejam fornecidos
    const novoEmail = email || cliente.getEmail(); 
    const novoTelefone = telefone || cliente.getTelefone();
    const novoEndereco = endereco|| cliente.getendereco(); 
    const novaCidade = cidade || cliente.getcidade(); 
    await this.repo.atualizarCliente(id, novoEmail, novoTelefone, novoEndereco, novaCidade);
    console.log("Cliente com ID ${id} atualizado com sucesso!");
  }
}
