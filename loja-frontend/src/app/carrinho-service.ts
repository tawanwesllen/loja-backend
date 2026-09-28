import { Injectable, signal, computed } from '@angular/core';
import { Produto as ProdutoOriginal } from './models/produto';

export type Produto = ProdutoOriginal;

/** Composto por um produto e a quantidade desse produto
 *  que pode ser adicionado ao carrinho
 */
export type Item = {
  id: number;
  produto: Produto;
  quantidade: number;
};

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  /** Signal contendo a lista de itens no carrinho */
  itens = signal<Item[]>([]);

  /** Total calculado da compra */
  readonly total = computed(() => this.obterTotalCompra());

  /**
   * Adiciona um item ou produto ao carrinho.
   * Se já existir, incrementa a quantidade.
   */
  adicionarItem(itemOuProduto: Item | Produto, quantidade: number = 1): void {
    const isItem = 'produto' in itemOuProduto;
    const produto: Produto = isItem
      ? (itemOuProduto as Item).produto
      : (itemOuProduto as Produto);
    const qtd = isItem
      ? ((itemOuProduto as Item).quantidade || 1)
      : (quantidade > 0 ? quantidade : 1);
    const id = isItem ? (itemOuProduto as Item).id : produto.id;

    this.itens.update(itens => {
      const index = itens.findIndex(i => i.produto.id === produto.id || i.id === id);
      if (index !== -1) {
        return itens.map((item, idx) =>
          idx === index
            ? { ...item, quantidade: item.quantidade + qtd }
            : item
        );
      }
      return [...itens, { id, produto, quantidade: qtd }];
    });
  }

  /** Alias para adicionarItem */
  adicionar(itemOuProduto: Item | Produto, quantidade: number = 1): void {
    this.adicionarItem(itemOuProduto, quantidade);
  }

  /**
   * Aumenta a quantidade de um item no carrinho.
   */
  aumentarQuantidade(idOuItem: number | Item, quantidade: number = 1): void {
    const id = typeof idOuItem === 'number' ? idOuItem : idOuItem.id;
    const qtd = quantidade > 0 ? quantidade : 1;

    this.itens.update(itens =>
      itens.map(item =>
        item.id === id || item.produto.id === id
          ? { ...item, quantidade: item.quantidade + qtd }
          : item
      )
    );
  }

  /** Alias para aumentarQuantidade */
  aumentar(idOuItem: number | Item, quantidade: number = 1): void {
    this.aumentarQuantidade(idOuItem, quantidade);
  }

  /**
   * Diminui a quantidade de um item no carrinho.
   * Se a quantidade chegar a zero ou menos, o item é removido.
   */
  diminuirQuantidade(idOuItem: number | Item, quantidade: number = 1): void {
    const id = typeof idOuItem === 'number' ? idOuItem : idOuItem.id;
    const qtd = quantidade > 0 ? quantidade : 1;

    this.itens.update(itens =>
      itens
        .map(item =>
          item.id === id || item.produto.id === id
            ? { ...item, quantidade: item.quantidade - qtd }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
  }

  /** Alias para diminuirQuantidade */
  diminuir(idOuItem: number | Item, quantidade: number = 1): void {
    this.diminuirQuantidade(idOuItem, quantidade);
  }

  /**
   * Remove um item do carrinho pelo id ou pelo próprio item.
   */
  removerItem(idOuItem: number | Item): void {
    const id = typeof idOuItem === 'number' ? idOuItem : idOuItem.id;

    this.itens.update(itens =>
      itens.filter(item => item.id !== id && item.produto.id !== id)
    );
  }

  /** Alias para removerItem */
  remover(idOuItem: number | Item): void {
    this.removerItem(idOuItem);
  }

  /**
   * Obtém o total da compra (soma do preço de cada produto * quantidade).
   */
  obterTotalCompra(): number {
    return this.itens().reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  }

  /** Alias para obterTotalCompra */
  obterTotal(): number {
    return this.obterTotalCompra();
  }

  /**
   * Limpa todos os itens do carrinho.
   */
  limparCarrinho(): void {
    this.itens.set([]);
  }

  /** Alias para limparCarrinho */
  limpar(): void {
    this.limparCarrinho();
  }
}
