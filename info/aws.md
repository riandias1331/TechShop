Launch an instance  Info
Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below.

Name and tags  Info
Name
TechShop
Add additional tags
Application and OS Images (Amazon Machine Image)  Info
An AMI contains the operating system, application server, and applications for your instance. If you don't see a suitable AMI below, use the search field or choose Browse more AMIs.

Recents

Quick Start
Amazon Linux
macOS
Ubuntu
Windows
Red Hat
SUSE Linux
Debian



Amazon Machine Image (AMI)

Ubuntu Server 24.04 LTS (HVM), SSD Volume Type
Free tier eligible
ami-0f5fcdfbd140e4ab7 (64-bit (x86)) / ami-07f75595710e1c42b (64-bit (Arm))
Virtualization: hvm
ENA enabled: true
Root device type: ebs
Description
Ubuntu Server 24.04 LTS (HVM),EBS General Purpose (SSD) Volume Type. Support available from Canonical (http://www.ubuntu.com/cloud/services).

Canonical, Ubuntu, 24.04, amd64 noble image
Architecture

64-bit (x86)
AMI ID
ami-0f5fcdfbd140e4ab7
Publish Date
2025-10-22
Username
ubuntu
Verified provider
Instance type  Info | Get advice
Instance type

t3.micro
Free tier eligible
Family: t3
2 vCPU
1 GiB Memory
Current generation: true
On-Demand RHEL base pricing: 0.0392 USD per Hour
On-Demand Ubuntu Pro base pricing: 0.0139 USD per Hour
On-Demand Windows base pricing: 0.0196 USD per Hour
On-Demand SUSE base pricing: 0.0104 USD per Hour
On-Demand Linux base pricing: 0.0104 USD per Hour
All generations
Compare instance types
Additional costs apply for AMIs with pre-installed software
Key pair (login)  Info
You can use a key pair to securely connect to your instance. Ensure that you have access to the selected key pair before you launch the instance.
Key pair name - required 

pass-gen-ec2

Create new key pair
Network settings  Info
Edit
Network
 Info
vpc-03e7ea097f4e7c5d4

Subnet
 Info
No preference (Default subnet in any availability zone)

Auto-assign public IP
 Info
Enable

Firewall (security groups)
 Info
A security group is a set of firewall rules that control the traffic for your instance. Add rules to allow specific traffic to reach your instance.
Create security group
Select existing security group
We'll create a new security group called 'launch-wizard-2' with the following rules:
Allow SSH traffic from
Helps you connect to your instance

Anywhere
0.0.0.0/0
Allow HTTPS traffic from the internet
To set up an endpoint, for example when creating a web server
Allow HTTP traffic from the internet
To set up an endpoint, for example when creating a web server
Rules with source of 0.0.0.0/0 allow all IP addresses to access your instance. We recommend setting security group rules to allow access from known IP addresses only.

Configure storage  Info
Advanced
1x
16
GiB

gp3
Root volume,
3000 IOPS,
Not encrypted
Add new volume
The selected AMI contains instance store volumes, however the instance does not allow any instance store volumes. None of the instance store volumes from the AMI will be accessible from the instance
Click refresh to view backup information
The tags that you assign determine whether the instance will be backed up by any Data Lifecycle Manager policies.

0 x File systemsEdit
Advanced details  Info
Summary
Number of instances
 Info
1
Software Image (AMI)
Canonical, Ubuntu, 24.04, amd6...read more
ami-0f5fcdfbd140e4ab7
Virtual server type (instance type)
t3.micro
Firewall (security group)
New security group
Storage (volumes)
1 volume(s) - 16 GiB
Cancel
Launch instance







----





##



🚀 GUIA COMPLETO: Deploy FullStack na AWS EC2
📋 PRÉ-REQUISITOS
Instância EC2 criada

Chave .pem baixada

Repositório Git do projeto

🎯 PASSO 1: CONEXÃO SSH
bash
# No Git Bash/Windows
cd /caminho/para/chave
chmod 400 "pass-gen-ec2.pem"
ssh -i "pass-gen-ec2.pem" ubuntu@ec2-3-14-8-253.us-east-2.compute.amazonaws.com
# Digite 'yes' quando perguntar
🐳 PASSO 2: INSTALAÇÃO DO DOCKER
bash
# Dentro da EC2
sudo apt update
sudo apt upgrade -y

# Instalar Docker oficial
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Adicionar usuário ao grupo docker
sudo usermod -aG docker ubuntu
🔄 PASSO 3: SAIR E ENTRAR NOVAMENTE
bash
# SAIR da sessão atual
exit

# Reconectar
ssh -i "pass-gen-ec2.pem" ubuntu@ec2-3-14-8-253.us-east-2.compute.amazonaws.com

# Testar Docker
docker --version
📥 PASSO 4: CLONAR PROJETO
bash
# Gerar chave SSH (se não tiver)
ssh-keygen -t ed25519 -C "seu-email@gmail.com"
# Pressione Enter 3x

# Copiar chave para GitHub
cat ~/.ssh/id_ed25519.pub
# Copie o output e adicione no GitHub: Settings → SSH and GPG keys

# Clonar projeto
git clone git@github.com:riandias1331/TechShop.git
cd TechShop
🏗️ PASSO 5: INSTALAR DOCKER COMPOSE
bash
# Docker Compose já vem com docker-compose-plugin
# Mas se precisar do antigo:
sudo apt install -y docker-compose
docker-compose --version
🚀 PASSO 6: RODAR APLICAÇÃO
bash
# Na pasta do projeto
cd ~/TechShop

# Subir containers
docker compose up -d

# Verificar se estão rodando
docker ps
# Deve mostrar:
# frontend-app (porta 5173)
# postgres-db (porta 5432)
# backend-app (se tiver)
🔧 PASSO 7: VERIFICAR PROBLEMAS
bash
# Ver logs dos containers
docker logs frontend-app
docker logs backend-app  # se tiver

# Ver se backend expôs porta
docker ps
# Se não mostrar porta 4000, precisa mapear no docker-compose.yml
🌐 PASSO 8: LIBERAR PORTAS NA AWS
No Console AWS:

Acesse https://console.aws.amazon.com/ec2/

Instances → Selecione sua instância

Aba Security → Clique no Security Group

Edit inbound rules → Add rule

Adicione:

Porta	Protocol	Source	Descrição
5173	TCP	0.0.0.0/0	Frontend React/Vite
4000	TCP	0.0.0.0/0	Backend API
22	TCP	Seu IP	SSH (já existe)
Save rules

🎯 PASSO 9: ACESSAR APLICAÇÃO
No seu navegador:

text
FRONTEND:
http://ec2-3-14-8-253.us-east-2.compute.amazonaws.com:5173

BACKEND (se tiver):
http://ec2-3-14-8-253.us-east-2.compute.amazonaws.com:4000
📊 PASSO 10: VERIFICAÇÃO FINAL
bash
# Dentro da EC2, teste localmente
curl http://localhost:5173

# Ver IP público
curl ifconfig.me
# Deve mostrar: 3.14.8.253

# Teste de fora (no seu PC)
# Abra navegador e acesse as URLs acima
⚡ COMANDOS ÚTEIS
bash
# Parar containers
docker compose down

# Reiniciar
docker compose restart

# Ver logs em tempo real
docker compose logs -f

# Limpar Docker
docker system prune -a -f

# Acessar container
docker exec -it frontend-app bash
🛠️ SOLUÇÃO DE PROBLEMAS COMUNS
1. Portas não acessíveis
bash
# Teste dentro da EC2
curl localhost:5173

# Ver firewall
sudo ufw status

# Ver Security Groups no console AWS
2. Backend não aparece
Edite docker-compose.yml:

yaml
backend:
  ports:
    - "4000:4000"  # Adicione esta linha
3. Erro de permissão Docker
bash
sudo usermod -aG docker ubuntu
exit
# Reconecte
4. Container para de rodar
bash
docker logs nome-do-container
# Ver erro específico
✅ CHECKLIST FINAL





##


# Reconectar
ssh -i "pass-gen-ec2.pem" ubuntu@ec2-3-14-8-253.us-east-2.compute.amazonaws.com