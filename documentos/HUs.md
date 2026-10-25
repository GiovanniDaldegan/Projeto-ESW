### 1. Cadastro de usuário

**Eu, como Usuário, quero fazer cadastro, para fazer login na plataforma.**

* **Critérios de aceite:**

  * Quando o usuário inserir um e-mail válido que não esteja cadastrado e uma senha válida, a conta deve ser criada.
  * Após o cadastro, o usuário deve ser direcionado para a tela de login.
  * Quando o usuário inserir um e-mail que já esteja cadastrado, o sistema deve informar que o e-mail já está em uso.
  * Quando o usuário inserir um e-mail em formato inválido, o sistema deve informar que o e-mail é inválido.
  * Quando o usuário inserir uma senha que não atenda aos requisitos mínimos, o sistema deve informar os requisitos necessários.

---

### 2. Login

**Eu, como Usuário, quero fazer login, para acessar a plataforma.**

* **Critérios de aceite:**

  * Quando o usuário inserir um e-mail cadastrado e uma senha correta, deve ser autenticado.
  * Após o login, o usuário deve ser redirecionado para a tela **Meus Projetos**.
  * Quando o usuário inserir uma senha incorreta, o sistema deve informar que as credenciais são inválidas.
  * Quando o usuário inserir um e-mail que não esteja cadastrado, o sistema deve informar que as credenciais são inválidas.
  * O usuário não deve conseguir acessar as funcionalidades da plataforma sem estar autenticado.

---

## Projetos

### 3. Criar projeto

**Eu, como Usuário, quero criar um projeto, para organizar minhas histórias de usuário.**

* **Critérios de aceite:**

  * Quando o usuário informar os dados obrigatórios do projeto e confirmar a criação, o projeto deve ser criado.
  * O projeto criado deve ser associado ao usuário que o criou.
  * Após a criação, o projeto deve aparecer na tela **Meus Projetos**.
  * O sistema não deve permitir a criação de um projeto sem os campos obrigatórios preenchidos.
  * O sistema deve informar ao usuário caso ocorra algum erro durante a criação.

### 4. Visualizar projeto

**Eu, como Usuário, quero visualizar um projeto, para consultar suas informações e gerenciar seus elementos.**

* **Critérios de aceite:**

  * Quando o usuário selecionar um projeto em **Meus Projetos**, o sistema deve exibir os dados do projeto.
  * O sistema deve exibir os épicos, sprints e histórias de usuário associados ao projeto.
  * O usuário deve conseguir acessar somente projetos aos quais tenha permissão.
  * Caso o projeto não exista ou não esteja disponível para o usuário, o sistema deve informar que o projeto não foi encontrado.

### 5. Atualizar projeto

**Eu, como Usuário, quero atualizar um projeto, para manter suas informações atualizadas.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de editar um projeto, o sistema deve exibir seus dados atuais.
  * O usuário deve conseguir alterar os campos editáveis do projeto.
  * Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
  * Após a atualização, o sistema deve exibir os dados atualizados.
  * O usuário não deve conseguir atualizar um projeto que não lhe pertença ou ao qual não tenha permissão.

### 6. Excluir projeto

**Eu, como Usuário, quero excluir um projeto, para remover projetos que não são mais necessários.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de excluir um projeto, o sistema deve solicitar uma confirmação.
  * Quando o usuário confirmar a exclusão, o projeto deve ser removido da lista de **Meus Projetos**.
  * O sistema deve impedir a exclusão caso o usuário cancele a confirmação.
  * Após a exclusão, o projeto não deve mais estar disponível para o usuário.
  * O usuário não deve conseguir excluir um projeto que não lhe pertença ou ao qual não tenha permissão.

---

## Épicos

### 7. Criar épico

**Eu, como Usuário, quero criar um épico, para agrupar histórias de usuário relacionadas.**

* **Critérios de aceite:**

  * Quando o usuário informar os dados obrigatórios do épico e confirmar a criação, o épico deve ser criado.
  * O épico deve ser associado ao projeto selecionado.
  * Após a criação, o épico deve aparecer na lista de épicos do projeto.
  * O sistema não deve permitir a criação de um épico sem os campos obrigatórios preenchidos.

### 8. Visualizar épico

**Eu, como Usuário, quero visualizar um épico, para consultar suas informações e histórias relacionadas.**

* **Critérios de aceite:**

  * Quando o usuário selecionar um épico, o sistema deve exibir seus dados.
  * O sistema deve exibir as histórias de usuário associadas ao épico.
  * O usuário deve conseguir acessar somente épicos pertencentes a projetos aos quais tenha acesso.

### 9. Atualizar épico

**Eu, como Usuário, quero atualizar um épico, para manter suas informações atualizadas.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de editar um épico, seus dados atuais devem ser exibidos.
  * O usuário deve conseguir alterar os campos editáveis.
  * Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
  * Após a atualização, os dados modificados devem ser exibidos ao usuário.

### 10. Excluir épico

**Eu, como Usuário, quero excluir um épico, para remover agrupamentos de histórias que não são mais necessários.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de excluir um épico, o sistema deve solicitar confirmação.
  * Quando o usuário confirmar, o épico deve ser removido do projeto.
  * Caso o usuário cancele, o épico não deve ser excluído.
  * As histórias associadas ao épico devem ter seu comportamento de exclusão/desvinculação definido pelo sistema.
  * O usuário não deve conseguir excluir um épico ao qual não tenha permissão.

---

## Sprints

### 11. Criar Sprint

**Eu, como Usuário, quero criar uma Sprint, para organizar as histórias de usuário que serão desenvolvidas.**

* **Critérios de aceite:**

  * Quando o usuário informar os dados obrigatórios da Sprint e confirmar a criação, a Sprint deve ser criada.
  * A Sprint deve ser associada ao projeto selecionado.
  * Após a criação, a Sprint deve aparecer na lista de Sprints do projeto.
  * O sistema não deve permitir a criação de uma Sprint sem os campos obrigatórios preenchidos.
  * Caso a Sprint possua datas, a data de início não pode ser posterior à data de término.

### 12. Visualizar Sprint

**Eu, como Usuário, quero visualizar uma Sprint, para acompanhar as histórias de usuário planejadas.**

* **Critérios de aceite:**

  * Quando o usuário selecionar uma Sprint, o sistema deve exibir suas informações.
  * O sistema deve exibir as histórias de usuário associadas à Sprint.
  * O sistema deve exibir o status da Sprint.
  * O usuário deve conseguir acessar somente Sprints pertencentes a projetos aos quais tenha acesso.

### 13. Atualizar Sprint

**Eu, como Usuário, quero atualizar uma Sprint, para manter seu planejamento atualizado.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de editar uma Sprint, seus dados atuais devem ser exibidos.
  * O usuário deve conseguir alterar os campos editáveis da Sprint.
  * Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
  * Após a atualização, os dados modificados devem ser exibidos ao usuário.
  * O sistema deve impedir a definição de datas inválidas.

### 14. Excluir Sprint

**Eu, como Usuário, quero excluir uma Sprint, para remover Sprints que não são mais necessárias.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de excluir uma Sprint, o sistema deve solicitar confirmação.
  * Quando o usuário confirmar, a Sprint deve ser removida do projeto.
  * Caso o usuário cancele, a Sprint não deve ser excluída.
  * As histórias associadas à Sprint devem permanecer no projeto, sendo apenas desvinculadas da Sprint.
  * O usuário não deve conseguir excluir uma Sprint à qual não tenha permissão.

---

## Histórias de usuário

### 15. Criar história de usuário

**Eu, como Usuário, quero criar uma história de usuário, para registrar uma necessidade ou funcionalidade do projeto.**

* **Critérios de aceite:**

  * Quando o usuário informar os dados obrigatórios da história e confirmar a criação, a história deve ser criada.
  * A história deve ser associada ao projeto selecionado.
  * O usuário deve conseguir associar a história a um épico.
  * O usuário deve conseguir informar a pontuação da história.
  * O usuário deve conseguir cadastrar os critérios de aceite.
  * Após a criação, a história deve aparecer na lista de histórias do projeto.

### 16. Visualizar história de usuário

**Eu, como Usuário, quero visualizar uma história de usuário, para consultar seus detalhes e critérios de aceite.**

* **Critérios de aceite:**

  * Quando o usuário selecionar uma história, o sistema deve exibir seus dados.
  * O sistema deve exibir a descrição, pontuação, critérios de aceite, épico e Sprint associados, quando existirem.
  * O usuário deve conseguir visualizar o status atual da história.
  * O usuário deve conseguir acessar somente histórias pertencentes a projetos aos quais tenha acesso.

### 17. Atualizar história de usuário

**Eu, como Usuário, quero atualizar uma história de usuário, para manter suas informações atualizadas durante o desenvolvimento.**

* **Critérios de aceite:**

  * Quando o usuário selecionar uma história, deve conseguir editar seus dados.
  * O usuário deve conseguir editar a descrição da história.
  * O usuário deve conseguir alterar a pontuação da história.
  * O usuário deve conseguir adicionar, editar e remover critérios de aceite.
  * O usuário deve conseguir alterar o épico e a Sprint associados à história.
  * Quando o usuário salvar as alterações, os novos dados devem ser persistidos.

### 18. Excluir história de usuário

**Eu, como Usuário, quero excluir uma história de usuário, para remover histórias que não são mais necessárias.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de excluir uma história, o sistema deve solicitar confirmação.
  * Quando o usuário confirmar, a história deve ser removida do projeto.
  * Caso o usuário cancele, a história não deve ser excluída.
  * Após a exclusão, a história não deve mais aparecer nas listas do projeto.
  * O usuário não deve conseguir excluir uma história à qual não tenha permissão.

---

## 19. Logout

**Eu, como Usuário, quero sair da plataforma, para encerrar minha sessão com segurança.**

* **Critérios de aceite:**

  * Quando o usuário selecionar a opção de sair, sua sessão deve ser encerrada.
  * Após o logout, o usuário deve ser redirecionado para a tela de login.
  * O usuário não deve conseguir acessar as páginas autenticadas utilizando o histórico do navegador após sair.



# Nomes das histórias

Cadastro de usuário
Login
Criar projeto
Visualizar projeto
Atualizar projeto
Excluir projeto
Criar épico
Visualizar épico
Atualizar épico
Excluir épico
Criar Sprint
Visualizar Sprint
Atualizar Sprint
Excluir Sprint
Criar história de usuário
Visualizar história de usuário
Atualizar história de usuário
Excluir história de usuário
Logout

# Histórias de usuário

HU 01: Como usuário eu quero fazer cadastro para fazer login na plataforma.
HU 02: Como usuário eu quero fazer login para acessar a plataforma.
HU 03: Como usuário eu quero criar um projeto para organizar minhas histórias de usuário.
HU 04: Como usuário eu quero visualizar um projeto para consultar suas informações e gerenciar seus elementos.
HU 05: Como usuário eu quero atualizar um projeto para manter suas informações atualizadas.
HU 06: Como usuário eu quero excluir um projeto para remover projetos que não são mais necessários.
HU 07: Como usuário eu quero criar um épico para agrupar histórias de usuário relacionadas.
HU 08: Como usuário eu quero visualizar um épico para consultar suas informações e histórias relacionadas.
HU 09: Como usuário eu quero atualizar um épico para manter suas informações atualizadas.
HU 10: Como usuário eu quero excluir um épico para remover agrupamentos de histórias que não são mais necessários.
HU 11: Como usuário eu quero criar uma Sprint para organizar as histórias de usuário que serão desenvolvidas.
HU 12: Como usuário eu quero visualizar uma Sprint para acompanhar as histórias de usuário planejadas.
HU 13: Como usuário eu quero atualizar uma Sprint para manter seu planejamento atualizado.
HU 14: Como usuário eu quero excluir uma Sprint para remover Sprints que não são mais necessárias.
HU 15: Como usuário eu quero criar uma história de usuário para registrar uma necessidade ou funcionalidade do projeto.
HU 16: Como usuário eu quero visualizar uma história de usuário para consultar seus detalhes e critérios de aceite.
HU 17: Como usuário eu quero atualizar uma história de usuário para manter suas informações atualizadas durante o desenvolvimento.
HU 18: Como usuário eu quero excluir uma história de usuário para remover histórias que não são mais necessárias.
HU 19: Como usuário eu quero sair da plataforma para encerrar minha sessão com segurança.

# Requisitos de cada HU

Quando o usuário inserir um e-mail válido que não esteja cadastrado e uma senha válida, a conta deve ser criada.
Após o cadastro, o usuário deve ser direcionado para a tela de login.
Quando o usuário inserir um e-mail que já esteja cadastrado, o sistema deve informar que o e-mail já está em uso.
Quando o usuário inserir um e-mail em formato inválido, o sistema deve informar que o e-mail é inválido.
Quando o usuário inserir uma senha que não atenda aos requisitos mínimos, o sistema deve informar os requisitos necessários.

Quando o usuário inserir um e-mail cadastrado e uma senha correta, deve ser autenticado.
Após o login, o usuário deve ser redirecionado para a tela *Meus Projetos*.
Quando o usuário inserir uma senha incorreta, o sistema deve informar que as credenciais são inválidas.
Quando o usuário inserir um e-mail que não esteja cadastrado, o sistema deve informar que as credenciais são inválidas.
O usuário não deve conseguir acessar as funcionalidades da plataforma sem estar autenticado.

Quando o usuário informar os dados obrigatórios do projeto e confirmar a criação, o projeto deve ser criado.
O projeto criado deve ser associado ao usuário que o criou.
Após a criação, o projeto deve aparecer na tela *Meus Projetos*.
O sistema não deve permitir a criação de um projeto sem os campos obrigatórios preenchidos.
O sistema deve informar ao usuário caso ocorra algum erro durante a criação.

Quando o usuário selecionar um projeto em *Meus Projetos*, o sistema deve exibir os dados do projeto.
O sistema deve exibir os épicos, sprints e histórias de usuário associados ao projeto.
O usuário deve conseguir acessar somente projetos aos quais tenha permissão.
Caso o projeto não exista ou não esteja disponível para o usuário, o sistema deve informar que o projeto não foi encontrado.

Quando o usuário selecionar a opção de editar um projeto, o sistema deve exibir seus dados atuais.
O usuário deve conseguir alterar os campos editáveis do projeto.
Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
Após a atualização, o sistema deve exibir os dados atualizados.
O usuário não deve conseguir atualizar um projeto que não lhe pertença ou ao qual não tenha permissão.

Quando o usuário selecionar a opção de excluir um projeto, o sistema deve solicitar uma confirmação.
Quando o usuário confirmar a exclusão, o projeto deve ser removido da lista de *Meus Projetos*.
O sistema deve impedir a exclusão caso o usuário cancele a confirmação.
Após a exclusão, o projeto não deve mais estar disponível para o usuário.
O usuário não deve conseguir excluir um projeto que não lhe pertença ou ao qual não tenha permissão.

Quando o usuário informar os dados obrigatórios do épico e confirmar a criação, o épico deve ser criado.
O épico deve ser associado ao projeto selecionado.
Após a criação, o épico deve aparecer na lista de épicos do projeto.
O sistema não deve permitir a criação de um épico sem os campos obrigatórios preenchidos.

Quando o usuário selecionar um épico, o sistema deve exibir seus dados.
O sistema deve exibir as histórias de usuário associadas ao épico.
O usuário deve conseguir acessar somente épicos pertencentes a projetos aos quais tenha acesso.

Quando o usuário selecionar a opção de editar um épico, seus dados atuais devem ser exibidos.
O usuário deve conseguir alterar os campos editáveis.
Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
Após a atualização, os dados modificados devem ser exibidos ao usuário.

Quando o usuário selecionar a opção de excluir um épico, o sistema deve solicitar confirmação.
Quando o usuário confirmar, o épico deve ser removido do projeto.
Caso o usuário cancele, o épico não deve ser excluído.
As histórias associadas ao épico devem ter seu comportamento de exclusão/desvinculação definido pelo sistema.
O usuário não deve conseguir excluir um épico ao qual não tenha permissão.

Quando o usuário informar os dados obrigatórios da Sprint e confirmar a criação, a Sprint deve ser criada.
A Sprint deve ser associada ao projeto selecionado.
Após a criação, a Sprint deve aparecer na lista de Sprints do projeto.
O sistema não deve permitir a criação de uma Sprint sem os campos obrigatórios preenchidos.
Caso a Sprint possua datas, a data de início não pode ser posterior à data de término.

Quando o usuário selecionar uma Sprint, o sistema deve exibir suas informações.
O sistema deve exibir as histórias de usuário associadas à Sprint.
O sistema deve exibir o status da Sprint.
O usuário deve conseguir acessar somente Sprints pertencentes a projetos aos quais tenha acesso.

Quando o usuário selecionar a opção de editar uma Sprint, seus dados atuais devem ser exibidos.
O usuário deve conseguir alterar os campos editáveis da Sprint.
Quando o usuário salvar as alterações, os novos dados devem ser persistidos.
Após a atualização, os dados modificados devem ser exibidos ao usuário.
O sistema deve impedir a definição de datas inválidas.

Quando o usuário selecionar a opção de excluir uma Sprint, o sistema deve solicitar confirmação.
Quando o usuário confirmar, a Sprint deve ser removida do projeto.
Caso o usuário cancele, a Sprint não deve ser excluída.
As histórias associadas à Sprint devem permanecer no projeto, sendo apenas desvinculadas da Sprint.
O usuário não deve conseguir excluir uma Sprint à qual não tenha permissão.

Quando o usuário informar os dados obrigatórios da história e confirmar a criação, a história deve ser criada.
A história deve ser associada ao projeto selecionado.
O usuário deve conseguir associar a história a um épico.
O usuário deve conseguir informar a pontuação da história.
O usuário deve conseguir cadastrar os critérios de aceite.
Após a criação, a história deve aparecer na lista de histórias do projeto.

Quando o usuário selecionar uma história, o sistema deve exibir seus dados.
O sistema deve exibir a descrição, pontuação, critérios de aceite, épico e Sprint associados, quando existirem.
O usuário deve conseguir visualizar o status atual da história.
O usuário deve conseguir acessar somente histórias pertencentes a projetos aos quais tenha acesso.

Quando o usuário selecionar uma história, deve conseguir editar seus dados.
O usuário deve conseguir editar a descrição da história.
O usuário deve conseguir alterar a pontuação da história.
O usuário deve conseguir adicionar, editar e remover critérios de aceite.
O usuário deve conseguir alterar o épico e a Sprint associados à história.
Quando o usuário salvar as alterações, os novos dados devem ser persistidos.

Quando o usuário selecionar a opção de excluir uma história, o sistema deve solicitar confirmação.
Quando o usuário confirmar, a história deve ser removida do projeto.
Caso o usuário cancele, a história não deve ser excluída.
Após a exclusão, a história não deve mais aparecer nas listas do projeto.
O usuário não deve conseguir excluir uma história à qual não tenha permissão.

Quando o usuário selecionar a opção de sair, sua sessão deve ser encerrada.
Após o logout, o usuário deve ser redirecionado para a tela de login.
O usuário não deve conseguir acessar as páginas autenticadas utilizando o histórico do navegador após sair.
