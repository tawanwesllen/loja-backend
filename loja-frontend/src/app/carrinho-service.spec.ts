import { TestBed } from '@angular/core/testing';
import { CarrinhoService, Item, Produto } from './carrinho-service';

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  const mockProduto1: Produto = {
    id: 1,
    nome: 'Smartphone Galaxy A55',
    preco: 2000.0,
    descricao: 'Smartphone Samsung'
  };

  const mockProduto2: Produto = {
    id: 2,
    nome: 'Fone de Ouvido Bluetooth',
    preco: 250.0,
    descricao: 'Fone JBL'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('deve ser criado com sucesso', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar com o signal de itens vazio', () => {
    expect(service.itens()).toEqual([]);
  });

  it('deve adicionar um item ao signal itens', () => {
    service.adicionarItem(mockProduto1, 2);
    expect(service.itens().length).toBe(1);
    expect(service.itens()[0].produto.nome).toBe('Smartphone Galaxy A55');
    expect(service.itens()[0].quantidade).toBe(2);
  });

  it('deve aceitar adicionar passando um objeto Item completo', () => {
    const item: Item = {
      id: 2,
      produto: mockProduto2,
      quantidade: 3
    };
    service.adicionarItem(item);
    expect(service.itens().length).toBe(1);
    expect(service.itens()[0].quantidade).toBe(3);
  });

  it('deve incrementar a quantidade se o mesmo produto for adicionado novamente', () => {
    service.adicionarItem(mockProduto1, 1);
    service.adicionarItem(mockProduto1, 2);
    expect(service.itens().length).toBe(1);
    expect(service.itens()[0].quantidade).toBe(3);
  });

  it('deve aumentar a quantidade de um item pelo id', () => {
    service.adicionarItem(mockProduto1, 2);
    service.aumentarQuantidade(mockProduto1.id);
    expect(service.itens()[0].quantidade).toBe(3);

    service.aumentarQuantidade(mockProduto1.id, 2);
    expect(service.itens()[0].quantidade).toBe(5);
  });

  it('deve diminuir a quantidade de um item', () => {
    service.adicionarItem(mockProduto1, 3);
    service.diminuirQuantidade(mockProduto1.id);
    expect(service.itens()[0].quantidade).toBe(2);

    service.diminuirQuantidade(mockProduto1.id, 1);
    expect(service.itens()[0].quantidade).toBe(1);
  });

  it('deve remover o item se a quantidade diminuir para zero ou menos', () => {
    service.adicionarItem(mockProduto1, 1);
    service.diminuirQuantidade(mockProduto1.id, 1);
    expect(service.itens().length).toBe(0);
  });

  it('deve remover um item explicitamente pelo id', () => {
    service.adicionarItem(mockProduto1, 1);
    service.adicionarItem(mockProduto2, 2);
    expect(service.itens().length).toBe(2);

    service.removerItem(mockProduto1.id);
    expect(service.itens().length).toBe(1);
    expect(service.itens()[0].produto.id).toBe(2);
  });

  it('deve obter o total correto da compra', () => {
    service.adicionarItem(mockProduto1, 2); // 2 * 2000 = 4000
    service.adicionarItem(mockProduto2, 3); // 3 * 250 = 750

    expect(service.obterTotalCompra()).toBe(4750.0);
    expect(service.obterTotal()).toBe(4750.0);
    expect(service.total()).toBe(4750.0);
  });

  it('deve retornar 0 quando o carrinho estiver vazio', () => {
    expect(service.obterTotalCompra()).toBe(0);
  });
});
