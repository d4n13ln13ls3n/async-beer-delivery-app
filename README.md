# Project Async Beer Delivery App
Projeto desenvolvido no módulo de Back End da [Trybe](https://www.betrybe.com/). 

## ✏ Informações sobre o projeto
O objetivo deste projeto <strong>Full Stack</strong> foi criar um aplicativo de entregas de bebidas que pode ser utilizado por clientes, vendedores e administradores.
- Foi construída uma API (utilizando o método TDD) e integradas - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados MySQL.
- Foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize, capaz de ser consumido pelo Front End da aplicação.
- Para acessar a aplicação, foi necessário ter um token, portanto a pessoa usuária (cliente, vendedor ou administrador) deverá estar logada para fazer as alterações. 
- O back end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
</br>
- A aplicação foi desenvolvida com <strong>Node.js e TypeScript</strong>, utilizando a <strong>arquitetura MSC</strong> (Model, Service, Controller) e <strong>MySQL</strong> para realizar o CRUD (Create, Read, Update and Delete) dos itens.
- Para gerar e autenticar token foi utilizado o JSON Web Token - <strong>JWT</strong>.
- O Front End da aplicação foi construído utilizando React e Bootstrap.

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
 
 2. Instale as dependências

  - Para isso, use o seguinte comando: `npm install`
  
  <details>
  <summary>
    <strong>🪛 Scripts relevantes do <code>package.json</code> principal</strong>
  </summary><br>

  **Observação:** nesse projeto, utilizamos o gerenciador de processos `pm2`. Caso você queira entender melhor o que são gerenciadores de processos Node, dê uma conferida [nesse link](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/f04cdb21-382e-4588-8950-3b1a29afd2dd/section/c2647acd-7619-4c8a-a7d8-13b452281c35/lesson/99c92a3a-8b45-4428-8ed6-c1c8a7ffdeac).

  **São os scripts da raiz do projeto (`./package.json`) e não das aplicações individuais `./front-end/package.json` e `./back-end/package.json`**:

  - `start`: Limpa as portas `3000` e `3001` e simula a inicialização no avaliador. Também prepara o campo rodando o `Sequelize` para restaurar o **banco de dados de testes** (final `-test`) e sobe a aplicação com `pm2` em modo `fork` (uma instância para cada aplicação). Nesse modo, as alterações não são assistidas;
    - *uso (na raiz do projeto): `npm start`*

  - `stop`: Para e deleta as aplicações rodando no `pm2`;
    - *uso (na raiz do projeto): `npm stop`*

  - `dev`: Limpa as portas `3000` e `3001` e sobe a aplicação com `pm2` em modo `fork` (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo `watch`);
    - *uso (na raiz do projeto): `npm run dev`*

  - `dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (`npm i`) nos dois projetos (`./front-end` e `./back-end`) e roda o `Sequelize` no `./back-end` (lembrar de configurar o `.env` no mesmo);
    - *uso (na raiz do projeto): `npm run dev:prestart`*

  - `db:reset`: Roda os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`). Utilize esse script caso ocorra algum problema no seu banco local;
    - *uso (na raiz do projeto): `npm run db:reset`*

  - `db:reset:debug`: Roda os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`). Utilize esse script caso ocorra algum problema no seu banco local. Esse comando também é capaz de retornar informações detalhadas de erros (quando ocorrerem no processo);
    - *uso (na raiz do projeto): `npm run db:reset:debug`*

  - `test <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de testes** (final `-test`);
    - *uso (na raiz do projeto): `npm test`, `npm test 01login 02register` ou ainda `npm run test 01 02`*

  - `test:dev <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`); 
    - *uso (na raiz do projeto): `npm run test:dev`, `npm run test:dev 01login 02register` ou ainda `npm test:dev 01 02`*;

  - `test:dev:open <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`), exemplo `npm test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`. Esse teste deve abrir uma janela mostrando o comportamento das páginas;
    - *uso (na raiz do projeto): `npm run test:dev:open`, `npm run test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`*;

  - `test:dev:report "<nomes-dos-arquivos>"`: Roda todos os testes (ou uma parte deles caso `"<nomes-dos-arquivos>"` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`). Esse teste devolve um output em texto com o resultado de todos os testes. Os `logs` são gerados em `./__tests__/reports`.
    - *uso (na raiz do projeto): `npm run test:dev:report`, `npm run test:dev:report "01login 02register"` ou ainda `npm run test:dev:report "01 02"`*;

</details>
