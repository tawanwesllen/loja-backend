import express, { type Express, type Request, 
                  type Response } from 'express';

const app: Express = express();

const produtos = [
  {
    "id": 1,
    "nome": "Smartphone Galaxy A55",
    "marca": "Samsung",
    "descricao": "Smartphone com tela Super AMOLED de 6,6 polegadas, 128 GB de armazenamento e câmera de alta resolução.",
    "preco": 1999.90,
    "foto": "https://i.zst.com.br/thumbs/12/3d/33/-1239604765.jpg",
    "quantidade": 15
  },
  {
    "id": 2,
    "nome": "Notebook IdeaPad 3",
    "marca": "Lenovo",
    "descricao": "Notebook com processador Intel Core i5, 8 GB de RAM e SSD de 256 GB.",
    "preco": 3299.00,
    "foto": "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjM0NDM3fGltYWdlL3BuZ3xoYzQvaDc0LzE0MDgwNDczODU4MDc4LnBuZ3w0NTU3MDkzMDU0NTFkOGE0MWJlZDMxODMzNjQxMWE4ZGVmZjEwM2ZlMmNhYjVhNTZmZWE4NTU2MmEzNTBkYTgw/lenovo-laptop-ideapad-3-gen-6-15-amd-subseries-hero.png?width=584&height=584",
    "quantidade": 8
  },
  {
    "id": 3,
    "nome": "Fone de Ouvido Bluetooth",
    "marca": "JBL",
    "descricao": "Fone sem fio com conexão Bluetooth, microfone integrado e bateria de longa duração.",
    "preco": 249.90,
    "foto": "https://m.media-amazon.com/images/I/51olNZRjn+L._AC_SX425_.jpg",
    "quantidade": 32
  },
  {
    "id": 4,
    "nome": "Smart TV 50 polegadas",
    "marca": "LG",
    "descricao": "Smart TV 4K UHD com sistema webOS, Wi-Fi integrado e suporte a aplicativos de streaming.",
    "preco": 2799.90,
    "foto": "https://m.media-amazon.com/images/I/61eRNyixEfL._AC_SX425_.jpg",
    "quantidade": 6
  },
  {
    "id": 5,
    "nome": "Mouse Sem Fio",
    "marca": "Logitech",
    "descricao": "Mouse óptico sem fio com conexão USB, design ergonômico e alta precisão.",
    "preco": 99.90,
    "foto": "https://m.media-amazon.com/images/I/61cZLujzS3L._AC_SX569_.jpg",
    "quantidade": 45
  }
]

app.get('/', (req: Request, res: Response) => {
  res.redirect('/produtos');
});

app.get('/produtos', (req: Request, res: Response) => {
  res.json(produtos);
});

app.get('/produtos/:id', (req: Request, res: Response) => {
  const id = +req.params.id; //Pega o parâmetro
  if (produtos && produtos.length > 0) {
    const prod = produtos.find(p => p.id === id);
    res.json(prod);
  }
  res.json([]);
});

app.listen(3000, () => {
    console.log('back-end ok!')
});