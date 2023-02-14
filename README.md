# Project Async Beer Delivery App
Projeto Full-Stack desenvolvido em equipe no final do módulo de Back End da [Trybe](https://www.betrybe.com/). 

## ✏ Informações sobre o projeto![Captura de tela de 2023-02-14 11-42-45](https://user-images.githubusercontent.com/92753791/218770906-a6246ac0-33e4-45c6-8021-072d64af7b65.png)

O objetivo deste projeto <strong>Full Stack</strong> foi criar um aplicativo de entregas de bebidas que pode ser utilizado por clientes, vendedores e administradores.
- Foi construída uma API (utilizando o método TDD) e integradas - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados MySQL.
- Foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize, capaz de ser consumido pelo Front End da aplicação.
- Para acessar a aplicação, foi necessário ter um token, portanto a pessoa usuária (cliente, vendedor ou administrador) deverá estar logada para fazer as alterações. 
- O back end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
</br>
- A aplicação foi desenvolvida com <strong>Node.js e TypeScript</strong>, utilizando a <strong>arquitetura MSC</strong> (Model, Service, Controller) e <strong>MySQL</strong> para realizar o CRUD (Create, Read, Update and Delete) dos itens.
- Para gerar e autenticar token foi utilizado o JSON Web Token - <strong>JWT</strong>.
- O Front End da aplicação foi construído utilizando React e Bootstrap.
- O projeto foi desenvolvido utilizando Metodologias Ágeis, com Daily Meetings e planejamento visual seguindo um esquema no Figma.

 <details>
 <summary> 🇬🇧 English here</summary>
 ✏ Information about the project</br>
 The goal of this full-stack project was to create a beverage delivery app that can be used by customers, salespeople and the website administrator. </br>
  - An API was built (using Test-driven Development - TDD) and integrated - through docker-compose - so as to work consuming data from a MySQL database.</br>
  - A dockerized back end was built using data modeling through Sequelize, able to be consumed by the Front End of the application.</br>
  - To access the application, it is necessary to have a token, therefore the user(customer, salesperson or admin) must be logged in order to make any changes.</br>
  - The back end implemented business rules to adequately populate the table available in the Front End, which is displayed to the user accessing the system.</br>
 </br>
 - The application was developed with <strong>Node.js and Typescript</strong>, using <strong>MSC architecture</strong> (Model, Service and Controller) and <strong>MySQL</strong> to perform CRUD (Create, Read, Update and Delete) operations.</br>
 - To generate and authenticate tokens, we used the library JSON Web Token - <strong>JWT</strong>.
 </details>
 
## 🛸 Principais tecnologias utilizadas / Main technologies used: 
- [Bootstrap](https://https://getbootstrap.com/);
- [Docker](https://www.docker.com/);
- [Express.js](https://expressjs.com/);
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript);
- [JWT(Autenticação)](https://jwt.io/);
- [MYSQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Node.js](https://nodejs.org/en/);
- [React](https://https://reactjs.org/);
- [Sequelize](https://sequelize.org/);
- [TypeScript](https://www.typescriptlang.org/);

## ⚙ Instruções para rodar o projeto em sua máquina

<strong>1. Fazer o git clone na sua máquina e entrar no diretório:</strong>
 - Lembre-se de clonar o repositório no diretório desejado na sua máquina!
 ```
 git clone git@github.com:d4n13ln13ls3n/async-beer-delivery-app.git
 cd async-beer-delivery-app
 ```
 
 <strong>2. Instale as dependências</strong>

  - Para isso, use o seguinte comando: 
  ```
  npm install
  ```
  
 <strong>3. Inicie a API</strong>
 
  - Para isso, acesse o diretório back-end
  ```
  cd back-end
  ```
  
  - Rode o comando
  ```
  npm start
  ```
  
  > PS - a API irá rodar na porta 3001, então certifique-se que a mesma não está sendo usada
  
  <strong>4. Acesse o front-end da aplicação</strong>
 
  - Para isso, em outra janela do terminal, volte ao diretório raiz e depois acesse o diretório front-end
  ```
  cd ..
  cd front-end
  ```
  
  - Rode o comando
  ```
  npm start
  ```
  > PS - A aplicação irá rodar na porta 3000, então certifique-se que a mesma não está sendo usada. Caso esteja, será perguntado se quer rodar em outra porta, o que pode ser feito sem problemas.
  
  ## Com Docker

  > Rode o serviço `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers. A recomendação é pela performance do seu computador, pois o `docker-compose.yml` está configurado para mapear a porta padao do `mysql` do container para a porta `3307` e não `3306`. 
  - Esse serviço irá inicializar um container chamado `db`.
  - A partir daqui você pode fazer operações que necessitem do banco de dados, como inserir e consultar pedidos e usuários.
  
  ## Como usar a aplicação
  <strong>Cliente</strong>
  - Para acessar a aplicação como cliente, utilize as credenciais abaixo:
  ```
  email: zebirita@email.com
  senha: '$#zebirita#$'
  ```
  
  <strong>Vendedor</strong>
  - Para acessar a aplicação como vendedor, utilize as credenciais abaixo:
  ```
  email: fulana@deliveryapp.com
  senha: fulana@123
  ```

  <strong>Administrador</strong>
  - Para acessar a aplicação como administrador, utilize as credenciais abaixo:
  ```
  email: adm@deliveryapp.com
  senha: --adm2@21!!--
  ```
  
  ## :clap: Agradecimentos aos membros da equipe:
  
  - [Adriano Costa](https://github.com/adfcosta)
  - [Fábio Barbirato](https://github.com/FabioBarbirato)
  - [Gabriel Thiago](https://github.com/oGabrielDev)
  - [Tayná Macedo](https://github.com/Tayna-Silva-Macedo)
