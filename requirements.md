# Cadastro de usuários

  **RF** Requisitos funcionais:
  - Deve ser possível cadastrar um novo usuário

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível cadastrar um novo usuário sem email, senha, name, username e licenca de motorista
  - Não deve ser possível cadastrar um novo usuário se um mesmo com email já existe
  - Não deve ser possível cadastrar um novo usuário se um mesmo com username já existe
 ---

 # Autenticacão de usuários

  **RF** Requisitos funcionais:
  - Deve ser possível fazer login do usuário

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível fazer login do usuário sem email e senha
  - Não deve ser possível fazer login do usuário se ele não existir
  - Não deve ser possível fazer login do usuário se a senha estiver incorreta
  - Dado a senha e email do usuário corretos deve ser retornado um token de acesso e os dados do usuário
 ---

# Cadastro de especificacões

  **RF** Requisitos funcionais:
  - Deve ser possível realizar o cadastro de especificacões

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível realizar o cadastro de especificacão se ela já existir
  - Deve ser possível realizar o cadastro de especificacões passando nome e descrição da espeficação

 ---

# Cadastro de categorias

  **RF** Requisitos funcionais:
  - Deve ser possível realizar o cadastro de uma categoria

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível realizar o cadastro da categoria se ela já existir
  - Deve ser possível realizar o cadastro da categoria passando nome e descrição da categoria

 ---

# Cadastro de carros

  **RF** Requisitos funcionais:
  - Deve ser possível cadastrar um novo carro
  - Deve ser possível listar todas as categorias

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível cadastrar um novo carro com uma placa já existente.
  - Não deve ser possível alterar a placa de um carro já existente.
  - Deve ser cadastrado um novo carro por padrão com disponibilidade.
  - Não deve ser possível cadastrar um novo carro se o usuário não for admin.

---

# Listagem de carros

  **RF** Requisitos funcionais:
  - Deve ser possível fazer a listagem de carros disponíveis
  - Deve ser possível fazer a listagem de carros disponíveis por nome
  - Deve ser possível fazer a listagem de carros disponíveis por marca
  - Deve ser possível fazer a listagem de carros disponíveis por categoria

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível listar carros que não estão disponíveis
  - Não é necessário está logado no sistema para listar os carros
  
--- 
# Cadastro de especificacões para um carro

  **RF** Requisitos funcionais:
  - Deve ser possível cadastrar uma espeficação para um carro
  - Deve ser possível listar todas as especificacões
  - Deve ser possível listar todos os carros

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível cadastrar uma espeficação para um carro inexistente
  - Não deve ser possível cadastrar uma espeficação para um carro se ela já existir
  - Não deve ser possível cadastrar uma nova espeficação para um carro se o usuário não for admin.
  
--- 
# Cadastro de imagens do carro

  **RF** Requisitos funcionais:
  - Deve ser possível cadastrar imagens para um carro
  - Deve ser possível listar todas os carros

  **RNF** Requisitos não funcionais:
  - Utilizar o multer para o upload de imagem

  **RN** Regras de negócio:
  - Não deve ser possível cadastrar uma imagem para um carro inexistente
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
  - Não deve ser possível cadastrar uma nova imagem para um carro se o usuário não for admin.
  

  --- 
# Aluguel de um carro

  **RF** Requisitos funcionais:
  - Deve ser possível realizar o aluguel de um carro

  **RNF** Requisitos não funcionais:

  **RN** Regras de negócio:
  - Não deve ser possível realizar o aluguel de um carro para um usuário não autenticado
  - Não deve ser possível realizar o aluguel de um carro se ele não estiver disponível
  - Não deve ser possível realizar o aluguel de um carro se já existe um em aberto para o mesmo usuário
  - Não deve ser possível realizar o aluguel de um carro se já existe um em aberto para o mesmo carro
  - O aluguel de um carro deve ter duracão mínima de 24 horas
  
  
  