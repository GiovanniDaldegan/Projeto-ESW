# Projeto-ESW
Trabalho prático da disciplina Engenharia de Software, UnB 2026/2

## Orientações

1. Ler a [Política de mudanças](#política-de-mudanças) do projeto
2. **Sempre checar o Trello**:
   1. Descrever cada cartão (marcar progresso usando checklist)
   2. Lembrar de atualizar tarefa
   3. Se voluntariar pra revisar tarefas na coluna *In Review*
3. Manter *branchs* do GitHub em ordem
   1. Criar *branch* ao iniciar tarefa
   2. Enviar *Pull Request* assim que terminar
   3. Revisar demais *PRs* esperando revisão

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

As branchs devem seguir o formato `tag/atualizacao-planejada`, como `feat/CRUD-usuario`. \
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
