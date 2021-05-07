# API-Vote-NodeJS

## Routes

### Auth
*POST* **/auth/signin** Se connecte avec les identifiants.
`name, password`
*POST* **/auth/signup** Enregistre un nouvel utilisateur.
`name, email, password`

### Admin
*GET* **/admin/users** Retourne tous les identifiants de tous les utilisateurs.
*GET* **/admin/users/:id** Retourne le nom d'un utilisateur.

### Vote
*GET* **/vote** Retourne tous les votes.

### Faker (data generation)
*POST* **/faker/vote** Génère un nouveau vote avec un nom et nombre de réactions.
`aucun`