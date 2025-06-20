# SD-WAN Simulation Toolkit - React

![SD-WAN Simulation Preview](demo.gif) *[Ajouter une capture d'écran réelle]*

## 🚀 Introduction

Application web interactive pour simuler des architectures SD-WAN avec :
- Équilibrage de charge dynamique
- Routage basé sur les politiques
- Visualisation du trafic en temps réel
- Analyse des performances réseau
<p>
<img src="Macbook-Air-localhost.png" alt="Éditeur de topologie" width="45%">
</p>

## ✨ Fonctionnalités

### Topologie Réseau
- 🖱️ Interface drag-and-drop
- 🌐 Création de nœuds (sites, DC, cloud)
- 🔗 Configuration des liens (latence, bande passante)
- 🎨 Visualisation overlay/underlay

### Simulation Temps Réel
- 📦 Génération de paquets
- 🛣️ Visualisation des chemins
- ⚙️ Profils de trafic (VoIP, vidéo, données)

### Équilibrage de Charge
- 🔄 Algorithmes configurables
- 📈 Métriques en direct
- ⚖️ Comparaison de stratégies

### Analytics
- 📊 Dashboard interactif
- 📉 Historique des performances
- 🚨 Alertes SLA
<p>
<img src="Macbook-Air-localhost (1).png" alt="Éditeur de topologie" width="45%">
</p>
## 🛠️ Technologies

| Catégorie        | Technologies                          |
|------------------|---------------------------------------|
| Frontend         | React 18, TypeScript, Redux Toolkit   |
| Visualisation    | D3.js, vis-network                   |
| UI               | Material-UI, TailwindCSS              |
| Build            | Vite, ESLint, Prettier               |

## 🏁 Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-user/sdwan-simulator.git
cd sdwan-simulator

# 2. Installer les dépendances
npm install

# 3. Démarrer l'application
npm run dev

# 4. Ouvrir http://localhost:3000