////////////////////////////////////////////////////
app.get attend :
////////////////////////////////////////////////////
une route (ex: "/")
une fonction callback (req, res) => { ... }
La bonne écriture est :

app.get("/", (req, res) => {
res.send("Bienvenue sur notre projet Node.js");
});

////////////////////////////////////////////////////
Rôle de sendFile
////////////////////////////////////////////////////

res.sendFile(chemin, options) envoie un fichier HTML (ou autre) au navigateur.

Le 1er argument : chemin relatif → "public/home.html"
Le 2e argument : options, dont root = dossier à partir duquel ce chemin est calculé
Express combine : root + chemin → fichier complet sur le disque. 2. Rôle de **dirname
**dirname est une variable fournie par Node : le dossier où se trouve app.js, ici :
C:\Eliezer\Me\Java Script\cours\node\node
Avec { root: **dirname }, Express cherche :
**dirname + public/home.html
→ ...\node\node\public\home.html 3. Pourquoi l’ancienne version plantait
{ root, **dirname } signifie en raccourci :
{ root: root, **dirname: **dirname }
**dirname existe (fourni par Node)
root n’existait pas comme variable → ReferenceError: root is not defined
Vous vouliez une propriété nommée root, pas une variable root. D’où l’écriture root: **dirname (clé root, valeur **dirname).
\_\_dirname
=
le dossier actuel
root
=
point de départ pour chercher le fichier

////////////////////////////////////////////////////
/_
app.js = JavaScript navigateur
server.js = backend Express
_/
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// app.js
////////////////////////////////////////////////////

// clique bouton
document.querySelector('#buyBtn')?.addEventListener('click', () => {
alert('Produit ajouté au panier')
})
// appeler le backend
fetch('/api/products')
.then(res => res.json())
.then(products => {
console.log(products)
})
// formulaire
document.querySelector('#contactForm')?.addEventListener('submit', async (e) => {
e.preventDefault()
await fetch('/api/contact', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
nom: 'Kabs'
})
})
})

////////////////////////////////////////////////////
// server.js
////////////////////////////////////////////////////

const express = require('express')
const mysql = require('mysql2')
const app = express()
app.use(express.json())
app.use(express.static('public'))
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'ecommerce'
})
app.get('/api/products', (req, res) => {
db.query(
'SELECT \* FROM products',
(err, results) => {
if (err) return res.status(500).json(err)
res.json(results)
}
)
})
app.post('/api/contact', (req, res) => {
console.log(req.body)
res.json({
success: true
})
})

app.listen(3000, () => {
console.log('http://localhost:3000')
})

////////////////////////////////////////////////////
Comprendre requête vs réponse (request/response)
////////////////////////////////////////////////////

- Le protocole HTTP est un protocole client ou chaque requette auras une reponse
  on distingue plusieures protocole http nottament :
- GET : recupperer quelques choses
- POST : publier quelques choses
- PUT : ajoute quelques chose
- DELETE : supprimer quelques choses

Voici une aperçu d'une Requête HTTP

https://google.com
https://8.8.8.8:80/index.html?color=white

- Protocole : https
- IP ou Domaine : 8.8.8.8 / ://google.com
- N° Port : 80
- Ressource : /index.html
- Variables Get : ?color=white / ?formulaire=valeur
