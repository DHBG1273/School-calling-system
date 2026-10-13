Sistema de chamada para as escolas

Meu primeiro projeto front-end, desenvolvido para colocar em prática os fundamentos de HTML, CSS e JavaScript. Apesar de possuir limitações de design e organização de código, o projeto funciona e representa uma etapa importante da minha evolução como desenvolvedor.

# Sistema de Chamada Escolar

## História do Projeto

Este sistema foi desenvolvido no início do meu segundo ano do Ensino Médio, a partir de uma ideia sugerida pelo meu professor. O objetivo era facilitar o processo de chamada realizado pelos monitores de sala, também conhecidos como líderes de turma, substituindo as tradicionais listas de papel, que frequentemente apresentavam problemas.

Este foi meu primeiro projeto de desenvolvimento front-end e uma etapa importante no início da minha jornada como desenvolvedor. Por ser meu primeiro contato com o desenvolvimento de um sistema completo, o código apresenta problemas de organização e práticas que hoje eu faria de maneira diferente. Na época, ainda não tinha o conhecimento necessário para seguir boas práticas de desenvolvimento, e o projeto acabou sendo difícil de manter e traduzir para o inglês.

Mais tarde, passei a aplicar o que aprendi em projetos como a TecAula e a AgroCrovador, adotando uma abordagem mais organizada e profissional.

Apesar das limitações, o sistema foi concluído e funciona como uma alternativa mais prática ao método tradicional de chamada. Entretanto, devido à falta de recursos digitais disponíveis na escola, a direção decidiu não dar continuidade à sua implementação.

## Funcionalidades

- **Registro de presença:** permite registrar e acompanhar a situação dos alunos durante a chamada.
- **Observações individuais:** possibilita adicionar observações aos registros dos alunos.
- **Armazenamento local:** utiliza o `localStorage` do navegador para salvar informações, como estados dos alunos, observações e outros dados da chamada.
- **Gerenciamento de turmas:** organiza os alunos de acordo com suas respectivas turmas.
- **Controle de acesso por turma:** cada turma possui uma senha compartilhada apenas com seus monitores, limitando o acesso às chamadas de outras turmas.
- **Identificação do monitor:** utiliza um código pessoal para identificar o monitor responsável pela chamada.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage

## Segurança e Limitações

Como o sistema foi desenvolvido sem um banco de dados, as informações são armazenadas localmente no navegador por meio do `localStorage`. Isso significa que os dados não são sincronizados entre dispositivos e podem ser perdidos caso o armazenamento do navegador seja apagado.

O sistema de acesso foi criado para reduzir interferências entre turmas e identificar os monitores responsáveis. Entretanto, trata-se de uma implementação simples, sem autenticação em um servidor, portanto não oferece garantias robustas contra adulteração ou acesso indevido.

## Aprendizados

Este projeto representa o início da minha trajetória no desenvolvimento front-end. Durante sua criação, tive a oportunidade de aplicar HTML, CSS e JavaScript na resolução de um problema real do ambiente escolar.

Embora reconheça as limitações técnicas e de organização do código, considero este projeto uma experiência importante para minha evolução, pois me permitiu compreender melhor os desafios de desenvolver uma aplicação funcional e identificar práticas que posso aprimorar em projetos futuros.
