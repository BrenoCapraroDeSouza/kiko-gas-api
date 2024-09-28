# Kiko Gas API

API oficial dos serviços Kiko Gás

### Passos para configuração do projeto:

1. Clone o repositório:

   ```
   git clone https://github.com/BrenoCapraroDeSouza/kiko-gas-api.git
   ```

2. Instale as dependências:

   ```
   npm i
   ```

3. Renomeie o arquivo `.env.example` para `.env` (Lembre-se de não comitar o arquivo `.env`).

4. Inicie o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

### Atualização do banco de dados:

Se houverem modificações nos modelos do `schema.prisma`, utilize o seguinte comando para sincronizar o banco de dados:

- Atualize o banco de dados local com o modelo:

  ```
  npx prisma db push
  ```

- Para sincronizar com o banco de dados no MongoDB Atlas:
  ```
  npx prisma db pull
  ```

### Contribuição:

Para contribuir com o projeto:

- Para cada task, crie uma branch separada e **não faça merge direto na branch `main`**.
- Aguarde a revisão de outro desenvolvedor ou utilize testes unitários e testes end-to-end (E2E) para garantir a qualidade do código antes de realizar o merge.
