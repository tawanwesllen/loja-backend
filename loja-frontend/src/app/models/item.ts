import { Produto } from './produto';

/** Composto por um produto e a quantidade desse produto
 *  que pode ser adicionado ao carrinho
 */
export type Item = {
  id: number;
  produto: Produto;
  quantidade: number;
};
