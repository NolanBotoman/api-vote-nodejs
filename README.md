# API-Vote-NodeJS

## Routes

### Interacting
*L'api (excepté la partie* **Auth** *) nécessite le passage d'un token dans l'header 'Authorization Bearer', ce token se récupère depuis le* **/auth/signin**<br/>

### Auth
*POST* **/auth/signin** Se connecte avec les identifiants.<br/>
```name, password```<br/>
*POST* **/auth/signup** Enregistre un nouvel utilisateur.<br/>
```name, email, password```<br/>

### Admin
*GET* **/admin/users** Retourne tous les identifiants de tous les utilisateurs.<br/>
```aucun```<br/>
*GET* **/admin/users/:id** Retourne le nom d'un utilisateur.<br/>
```aucun```<br/>

### Vote
*GET* **/vote** Retourne tous les votes.<br/>
```aucun```<br/>
*POST* **/vote** Enregistre pour l'utilisateur actuel un vote, s'il a déjà voté lui retourne un message d'erreur<br/>
```vote_id```<br/>

### Faker (data generation)
*POST* **/faker/vote** Génère un nouveau vote avec un nom et nombre de réactions.<br/>
```aucun```<br/>