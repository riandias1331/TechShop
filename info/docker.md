ESTRUTURA DE PROJETO
text
projeto-raiz/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── docker-compose.yml
🔄 CICLO DE DESENVOLVIMENTO
1️⃣ PRIMEIRA EXECUÇÃO OU APÓS MUDANÇAS
bash
# Zera tudo e sobe do zero (inclui rebuild das imagens)
docker compose down -v
docker compose up --build
2️⃣ APENAS INICIAR (quando já construído)
bash
# Sobe containers sem rebuild (mais rápido)
docker compose up
3️⃣ PARAR APENAS (sem perder dados)
bash
# Para containers mantendo volumes
docker compose down
4️⃣ PARAR E LIMPAR TUDO
bash
# Para containers + remove volumes (perde dados locais)
docker compose down -v
🛠️ COMANDOS ESSENCIAIS
Comando	O que faz	Uso comum
docker compose up	Sobe containers	Iniciar após mudanças leves
docker compose up --build	Build + Sobe	Após mudar código/Dockerfile
docker compose down	Para containers	Fim do dia, mantém dados
docker compose down -v	Para + remove volumes	Limpar cache, resetar DB
docker compose logs	Mostra logs	Debug de erros
docker compose ps	Lista containers	Verificar status
🚀 PUBLICANDO NO DOCKER HUB
1. Verificar imagens locais
bash
docker images
2. Taggear (nomear) as imagens
bash
# Formato: docker tag <ID-IMAGEM> <SEU-USUARIO>/<NOME>:<VERSAO>

# Frontend
docker tag frontend-image-id riandias/projectfull-frontend:1.0

# Backend  
docker tag backend-image-id riandias/projectfull-backend:1.0
3. Fazer login no Docker Hub
bash
docker login
4. Enviar (push) para Docker Hub
bash
docker push riandias/projectfull-frontend:1.0
docker push riandias/projectfull-backend:1.0
📥 UTILIZANDO EM OUTRA MÁQUINA
1. Baixar imagens
bash
docker pull riandias/projectfull-frontend:1.0
docker pull riandias/projectfull-backend:1.0
2. Criar docker-compose.yml para produção
yaml
version: '3.8'
services:
  backend:
    image: riandias/projectfull-backend:1.0
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      
  frontend:
    image: riandias/projectfull-frontend:1.0  
    ports:
      - "80:3000"
    depends_on:
      - backend
3. Executar em qualquer lugar
bash
docker compose up -d
💡 WORKFLOW RECOMENDADO
Desenvolvimento Local:
bash

# Taggear + push em sequência
docker tag techshop-frontend:latest riandias/techshop:frontend-1.0 && \
docker tag techshop-backend:latest riandias/techshop:backend-1.0 && \
docker push riandias/techshop:frontend-1.0 && \
docker push riandias/techshop:backend-1.0
# Fluxo diário
1. docker compose down          # Para containers do dia anterior
2. docker compose up --build    # Sobe com código atualizado

# Quando der problema
docker compose down -v          # Limpa tudo
docker compose up --build       # Recria do zero
Publicação:
bash
1. docker compose build         # Gera imagens finais
2. docker images               # Verifica IDs das imagens
3. docker tag ...              # Taggeia com versão
4. docker push ...             # Envia para Docker Hub
Deploy em Produção:
bash
1. docker pull ...             # Baixa imagens do Docker Hub
2. docker compose up -d        # Sobe em background
