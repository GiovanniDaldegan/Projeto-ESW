# Projeto-ESW
Trabalho prático da disciplina Engenharia de Software, UnB 2026/2

## Estrutura do projeto

```
/Projeto-ESW
├── documentos
│
├── frontend
│
└── backend
```

## Política de mudanças

Toda mudança no projeto deve ser feita em uma branch dedicada para ela antes de inserida na `main`.

Cada commit deve representar uma mudança específica. Evitar commits como `feat: backend` com todo o backend implementado de uma vez. Commits devem ser pequenos, frequentes e com descrições claras.

As branchs devem seguir o formato `tag/atualizacao-feita`, como `feat/CRUD-usuario`. \
Cada commit deve ser do formato `tag: mudança dentro da branch`, como `fix: requisição de criação de usuário`.

Quando uma branch estiver pronta para ser integrada com a main, o autor das mudanças deve criar uma pull request para a main e um revisor deve autorizar a mudança.

| tag        | descrição                                                   |
| ---------- | ----------------------------------------------------------- |
| `feat`     | uma nova feature do projeto                                 |
| `fix`      | correção de código                                          |
| `refactor` | refatoração de código                                       |
| `chore`    | tarefa que não altera código (documentos por exemplo)       |
| `docs`     | documentação do código                                      |
| `build`    | mudanças na build ou dependências                           |
| `style`    | mudanças na formatação do código (sem afetar funcionamento) |
