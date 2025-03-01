# Dystorzium

🚀 **Dystorzium** est un jeu web immersif conçu avec une architecture propre et modulaire. Il est basé sur un stack moderne incluant **React (Vite), TypeScript, Tailwind CSS, DaisyUI, Framer Motion, GASP, Express, Sequelize et PostgreSQL**.

## 📌 Table des matières

- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Structure du projet](#-structure-du-projet)
- [Tests](#-tests)
- [Déploiement sur Vercel](#-déploiement-sur-vercel)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🚀 Fonctionnalités principales

1. Frontend : Construit avec React, Vite, Tailwind CSS, DaisyUI, Framer Motion, et GASP pour une interface fluide et interactive.
2. Backend : Développé avec Express et Sequelize, utilisant PostgreSQL comme base de données relationnelle.
3. Architecture modulaire : La séparation claire des préoccupations pour faciliter la maintenance et l'extensibilité.
4. Responsivité : Conçu pour être responsive et accessible sur tous les appareils.

---

## 📁 Structure du projet

```
📦 dystorzium
├── 📂 backend
│   ├── src/
    │   ├── config/
│   │   ├── controllers/
    │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
    │   ├── seeds/
│   │   ├── utils/
│   ├── index.js
├── 📂 frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   ├── public/
│   ├── main.tsx
├── .env.example
├── package.json
└── README.md
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

Ce projet est présenté uniquement à des fins professionnelles pour mettre en valeur mes compétences en développement. Les contributions externes ne sont pas acceptées et toute modification ou distribution du code est interdite sans autorisation explicite.

---

## 📜 Licence

Ce projet est privé et destiné uniquement à la démonstration. Toute utilisation, modification ou redistribution sans autorisation préalable est interdite. Merci de respecter ces conditions.

