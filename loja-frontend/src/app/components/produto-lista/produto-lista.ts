import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-lista.html',
  styleUrls: ['./produto-lista.css']
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];
  private produtoService = inject(ProdutoService);

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (dados: Produto[]) => {
        this.produtos = dados;
      },
      error: (erro: unknown) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }
}