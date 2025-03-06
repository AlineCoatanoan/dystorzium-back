# Dystorzium

🚀 **Dystorzium** est un jeu web immersif conçu avec une architecture propre et modulaire. Il est basé sur un stack moderne incluant **React (Vite), TypeScript, Tailwind CSS, DaisyUI, Framer Motion, GASP, Express, Sequelize et PostgreSQL**.

## 📌 Table des matières

- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Optimisation Mobile](#-optimisation-mobile)
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

## 📱 Optimisation Mobile

Le projet **Dystorzium** est principalement conçu pour offrir une expérience immersive sur **desktop**. En raison de la nature interactive et de l'ambiance immersive du jeu. 

**Pourquoi ne pas optimiser pour mobile ?**
- **Immersion** : Le jeu a été conçu pour offrir une expérience immersive, et cela est plus crédible sur un écran de taille normale ou grande. De plus, l'utilisateur devant régulièrement se rendre sur des sites externes pour accéder à des informations ou des ressources, ce qui peut être difficile à gérer sur un écran plus petit.
- **Limites techniques** : Certaines animations et interactions (notamment avec **Framer Motion** et **GASP**) peuvent ne pas être aussi performantes ou adaptées sur des appareils mobiles.
- **Conception des interfaces** : L'interface utilisateur a été pensée pour des écrans plus larges, avec des éléments complexes qui pourraient être difficiles à naviguer sur un mobile.

Bien que l'expérience sur mobile ne soit pas idéale, il est possible de visiter le projet sur un appareil mobile, mais l'expérience pourrait ne pas refléter l'intention immersive du jeu.

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

