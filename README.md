# Dystorzium

🚀 **Dystorzium** est un projet web dystopique conçu avec une architecture propre et modulaire. Il est basé sur un stack moderne incluant **React (Vite), TypeScript, Tailwind CSS, DaisyUI, Express, Sequelize et PostgreSQL**.

## 📌 Table des matières

- [Pré-requis](#-pré-requis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [Utilisation](#-utilisation)
- [Tests](#-tests)
- [Déploiement sur Vercel](#-déploiement-sur-vercel)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## ✅ Pré-requis

Assurez-vous d'avoir installé les éléments suivants :
- [Node.js](https://nodejs.org/) (v16+ recommandé)
- [pnpm](https://pnpm.io/) (gestionnaire de paquets)
- [PostgreSQL](https://www.postgresql.org/)

---

## 🔧 Installation

Clonez le projet :
```sh
git clone https://github.com/ton-utilisateur/dystorzium.git
cd dystorzium
```

Installez les dépendances :
```sh
pnpm install
```

---

## ⚙️ Configuration

1. Copiez le fichier `.env.example` et renommez-le en `.env`
2. Remplissez les variables d'environnement, notamment la connexion à PostgreSQL :
   ```sh
   DATABASE_URL=postgres://user:password@localhost:5432/dystorzium
   ```

3. Initialisez la base de données :
   ```sh
   pnpm run db:reset
   ```

---

## 📁 Structure du projet

```
📦 dystorzium
├── 📂 backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   ├── index.js
├── 📂 frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   ├── main.tsx
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Utilisation

Lancez le backend :
```sh
pnpm run dev:server
```

Lancez le frontend :
```sh
pnpm run dev:client
```

---

## 🧪 Tests

Exécutez les tests :
```sh
pnpm test
```

---

## 🌍 Déploiement sur Vercel

1. Installez [Vercel CLI](https://vercel.com/docs/cli) :
   ```sh
   npm install -g vercel
   ```
2. Connectez-vous à Vercel :
   ```sh
   vercel login
   ```
3. Déployez le projet :
   ```sh
   vercel
   ```
4. Configurez les variables d'environnement via Vercel Dashboard.

---

## 🤝 Contribution

Les contributions sont les bienvenues !
1. Forkez le projet
2. Créez une branche (`git checkout -b feature-ma-feature`)
3. Commitez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez la branche (`git push origin feature-ma-feature`)
5. Ouvrez une **Pull Request** 🎉

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

