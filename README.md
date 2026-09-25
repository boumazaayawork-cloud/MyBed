# My Bed M.B — Plateforme E-Commerce Bilingue (Algérie 🇩🇿)

Plateforme e-commerce bilingue (**Français & Arabe avec support RTL**) pour la marque de literie de prestige **My Bed M.B**.

---

## 🚀 Démarrage Rapide (VS Code)

Dans votre terminal VS Code (`Ctrl` + `~`), lancez :

```bash
npm run dev
```

Ouvrez ensuite votre navigateur sur :
* **Storefront Français (LTR)** : [http://localhost:3000/fr](http://localhost:3000/fr)
* **Storefront Arabe (RTL)** : [http://localhost:3000/ar](http://localhost:3000/ar)
* **Espace Gérant / Admin** : [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🛏️ Produits & Modèles Intégrés

Tous les visuels du studio officiel de **My Bed M.B** sont configurés dans `public/images/products/` :
1. **Lits Coffre Métallique (Bois rouge massif)** :
   * Modèle **Sultan** (Best-seller royal, passepoil contrasté)
   * Modèle **Vienna** (Tête arrondie contemporaine)
   * Modèle **Nevine** (Style hôtelier enveloppant)
   * Modèle **Piano** (Capitonnage vertical moderne)
   * Modèle **Piano Pro +** (Capitonnage tête et pied de lit)
   * Modèle **Oslo** (Double coussin scandinave velours bleu nuit)
   * Modèle **Bubble** (Tissu bouclette organique moderne)
   * Modèle **Glaxsy** (Double cadre géométrique)
   * Modèle **Bulk** (Design capitonné façon nuage)
2. **Oreillers Ergonomiques & Plumes** :
   * Oreiller Visco Gel rafraîchissant (Cooling Gel)
   * Oreiller Visco à mémoire de forme
   * Oreiller à Plume naturelle
   * Oreiller Orthopédique fibre siliconée (50x70)
3. **Protection & Mobilier** :
   * Protège Matelas Imperméable (12 tailles)
   * Matelas Orthopédiques & Ressorts ensachés 7 zones
   * Tables de chevet LED et Dressings vitrés

---

## 💳 Formule de Paiement Algérienne

Le site implémente la formule de commande haute conversion en Algérie :
1. **Acompte initial** (ex: 5 000 DA) réglé par :
   * **Carte Edahabia / CIB** (via passerelle sécurisée Chargily)
   * **Versement BaridiMob / CCP** avec téléversement immédiat de la capture du reçu de paiement.
2. **Solde à la livraison** : Le reste est payé en espèces lors de la réception du meuble.

---

## 📊 Espace Gérant (`/admin`)

* Suivi du chiffre d'affaires et des acomptes reçus.
* Validation des reçus BaridiMob avec zoom sur l'image.
* Gestion du statut : `En attente d'acompte` ➔ `Acompte validé` ➔ `Expédié` ➔ `Livré & Soldé`.
* Appel direct du client en un clic ou message pré-rempli WhatsApp.
* Impression du Bon de Livraison officiel.
