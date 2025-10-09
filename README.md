Sistema de Retirada de Senhas 

Uma aplicação web desenvolvida com React + TypeScript, com o propósito de facilitar e humanizar o atendimento em um centro espírita.
O sistema foi criado para resolver um problema real enfrentado pelos assistidos da casa:

Antes, muitos precisavam chegar com horas de antecedência apenas para retirar uma senha presencialmente.

Agora, com esta aplicação, os assistidos podem retirar sua senha do conforto de seus lares, pelo navegador do celular ou computador, evitando deslocamentos desnecessários e longas esperas.

Trata-se de um projeto social e de caridade, sem fins lucrativos, voltado ao aprimoramento da experiência dos frequentadores e à organização das atividades da casa.

🌐 Acesso à Aplicação

O frontend está hospedado na Vercel e pode ser acessado através do link:
👉 https://ceald-web-app.vercel.app/

📱 Sobre o Projeto

O sistema permite que os usuários (assistidos do centro) retirem senhas de atendimento informando apenas nome e número de contato.
Após o envio do formulário, a aplicação retorna o número da senha correspondente.

Há também uma área administrativa, acessível via rota protegida (/admin), que permite aos administradores:

Visualizar a lista de consulentes na ordem de retirada das senhas;

Atualizar a lista em tempo real;

Gerar um arquivo PDF com a lista atualizada para impressão.

🕒 Horário de Funcionamento

⚠️ O sistema opera somente entre 12h e 16h.
Fora desse horário, as requisições de retirada de senha não são aceitas.
Essa limitação foi definida para respeitar o horário oficial de atendimento do centro espírita.

🌱 Visão de Futuro

Este projeto é o primeiro passo rumo a uma plataforma mais ampla do centro espírita.
A visão é evoluir para um portal de espiritualidade, oferecendo:

Publicações de conteúdos doutrinários e espirituais (textos, áudios e vídeos);

Divulgação de palestras e atividades da casa;

Canal de comunicação direta com os assistidos.

🚀 Próximas metas:
Na próxima versão, está planejada a migração do frontend que consome a API em TypeScript para uma arquitetura serverless, utilizando o ecossistema AWS Amplify, com Cognito para autenticação e DynamoDB para persistência de dados.
Essa evolução visa reduzir custos, aumentar a escalabilidade e simplificar o processo de implantação

🧠 Tecnologias Utilizadas
Frontend

⚛️ React
 + TypeScript

🎨 Tailwind CSS

🧩 shadcn/ui

🔍 TanStack Query (React Query)

☁️ Hospedagem: Vercel

Backend

🚀 Node.js
 + TypeScript

🗄️ MongoDB
 hospedado no MongoDB Atlas

🌐 API REST responsável pela comunicação com o frontend

⚙️ Estrutura do Projeto
📦 projeto-senhas-centro-espirita
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── tsconfig.json
│
└── README.md

🚀 Como Executar o Projeto Localmente
Pré-requisitos

Node.js v18+

npm ou yarn

Conta no MongoDB Atlas

1️⃣ Clonar o repositório
git clone https://github.com/seuusuario/projeto-senhas-centro-espirita.git
cd projeto-senhas-centro-espirita

2️⃣ Configurar o backend
cd backend
npm install


Crie um arquivo .env com as variáveis:

MONGO_URI=sua_url_do_mongodb_atlas
PORT=5000
ADMIN_PASSWORD=sua_senha_de_admin


Inicie o servidor:

npm run dev

3️⃣ Configurar o frontend
cd ../frontend
npm install
npm run dev


Acesse o aplicativo em:
👉 http://localhost:5173

🧾 Funcionalidades

✅ Retirada de senha de atendimento online
✅ Retorno imediato do número da senha
✅ Acesso administrativo protegido (/admin)
✅ Atualização dinâmica da lista de consulentes
✅ Exportação da lista em PDF
✅ Restrição de funcionamento por horário (12h–16h)
✅ Uso simples e acessível em dispositivos móveis
✅ Hospedagem estável e gratuita via Vercel

📄 Licença

Este projeto é de uso interno do centro espírita e não possui licença aberta no momento.
O código é distribuído para fins educativos e de caridade, sem fins comerciais.
