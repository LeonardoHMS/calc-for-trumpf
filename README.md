# Calculadora de Tempo para Máquina Puncionadeira - Trumpf
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/LeonardoHMS/calc-for-trumpf/blob/main/LICENSE)

Este projeto é uma aplicação Node.js que calcula o tempo necessário para a produção de peças em uma máquina puncionadeira da empresa Trumpf. Os resultados são usados para apontamento no sistema SAP.

## Visão Geral
A calculadora estima o tempo total necessário para o processamento de peças com base em diversos fatores, como dimensões da peça, número de punções, material utilizado, entre outros. O objetivo é facilitar o acompanhamento e controle do processo de produção, integrando as informações diretamente no SAP para otimização do planejamento de produção.

## Tecnologias Utilizadas
Node.js: Backend do servidor para gerenciar os cálculos e a API.
JavaScript: Linguagem principal utilizada para realizar os cálculos.
Express.js: Framework para criação e gerenciamento do servidor HTTP.
HTML/CSS: Interface simples para interação com o usuário.
SAP: Sistema de integração para o qual os dados de tempo são enviados.
Funcionalidades
Cálculo automático do tempo necessário para cada peça produzida.
Interface amigável para inserção dos dados de cada peça (dimensões, material, etc.).
Conexão direta com o sistema SAP para apontamento automático do tempo.
Instalação
Clone o repositório para o seu ambiente local:

bash
Copiar código
git clone https://github.com/LeonardoHMS/calc-for-trumpf.git
Navegue até o diretório do projeto:

```bash
cd calc-for-trumpf
```
Instale as dependências:


```bash
npm install
```
Inicie o servidor:

```bash
npm start
```
Acesse a aplicação no navegador:

```bash
http://localhost:3000
```

## Como Usar
Na interface da aplicação, insira as informações da peça a ser produzida:

Dimensões
Quantidade de punções
Tipo de material
Outras variáveis necessárias para o cálculo
Clique no botão para calcular o tempo.

O tempo calculado será exibido e pode ser automaticamente apontado no sistema SAP.

## Contribuição
Contribuições são bem-vindas! Se você tiver ideias para melhorar o projeto, siga os passos abaixo:

Faça um fork do repositório.
Crie um branch com sua feature: git checkout -b minha-feature.
Faça o commit das suas mudanças: git commit -m 'Adiciona minha feature'.
Envie para o branch principal: git push origin minha-feature.
Abra um Pull Request.

## Licença
Este projeto está sob a licença MIT.