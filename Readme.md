# Notes Express.js

## `app.get()` attend :

- une route (ex: `"/"`)
- une fonction callback `(req, res) => { ... }`

Exemple :

```js
app.get("/", (req, res) => {
  res.send("Bienvenue sur notre projet Node.js");
});
```

---

# Rôle de `sendFile`

`res.sendFile(chemin, options)` envoie un fichier HTML (ou autre) au navigateur.

## Arguments

### 1er argument : chemin relatif

```js
"public/home.html";
```

### 2e argument : options

`root` = dossier à partir duquel le chemin est calculé.

Express combine :

```bash
root + chemin
```

→ pour obtenir le fichier complet sur le disque.

---

# Rôle de `__dirname`

`__dirname` est une variable fournie par Node.js.

Elle représente le dossier actuel du fichier.

Exemple :

```bash
C:\Eliezer\Me\CODING\Java Script\cours\node\node
```

Avec :

```js
res.sendFile("public/home.html", {
  root: __dirname,
});
```

Express cherche :

```bash
__dirname + /public/home.html
```

Ce qui donne :

```bash
...\node\node\public\home.html
```

---

# Pourquoi l’ancienne version plantait

Tu avais :

```js
{
  (root, __dirname);
}
```

JavaScript l’interprète comme :

```js
{
  root: root,
  __dirname: __dirname
}
```

Problème :

- `__dirname` existe
- `root` n’existe pas → `ReferenceError`

La bonne écriture :

```js
{
  root: __dirname;
}
```

Ici :

- `root` = nom de propriété
- `__dirname` = valeur

---

# Différence entre `app.js` et `server.js`

## `app.js`

Code JavaScript exécuté dans le navigateur.

Exemple :

```js
document.querySelector("#buyBtn")?.addEventListener("click", () => {
  alert("Produit ajouté au panier");
});

fetch("/api/products")
  .then((res) => res.json())
  .then((products) => {
    console.log(products);
  });
```

---

## `server.js`

Code backend Node.js / Express.

Exemple :

```js
const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

app.post("/api/contact", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
```

---

# Comprendre requête vs réponse (`request / response`)

HTTP fonctionne selon le modèle :

```text
Client → Requête → Serveur
Client ← Réponse ← Serveur
```

Chaque requête reçoit une réponse.

## Principales méthodes HTTP

| Méthode |                        Rôle |
| ------- | --------------------------: |
| GET     |     récupérer une ressource |
| POST    | créer / envoyer des données |
| PUT     |      modifier une ressource |
| DELETE  |     supprimer une ressource |

---

# Exemple d’URL HTTP

```text
https://8.8.8.8:80/index.html?color=white
```

Découpage :

- **Protocole** → `https`
- **Domaine / IP** → `8.8.8.8`
- **Port** → `80`
- **Ressource** → `/index.html`
- **Query params** → `?color=white`

Exemple :

```text
?color=white
```

→ variable GET envoyée au serveur.

Tu peux en avoir plusieurs :

```text
?color=white&size=42
```
