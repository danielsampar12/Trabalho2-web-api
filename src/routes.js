const routes = require('express').Router();
const { uuid } = require('uuidv4')

const gameRepository = [];
const usersRepository = [];

//rotas /games
routes.get('/games',  (req, res) => {
    return res.json(gameRepository);
});

routes.post('/games', (req, res) => {
    const { title, price, platform, image, totalAvailable, isAvailable } = req.body;

    const game = {
        id: uuid(),
        title,
        price,
        platform,
        image,
        totalAvailable,
        isAvailable
    }
    gameRepository.push(game);

    return res.json(game);
});

routes.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    const gameIndex = gameRepository.findIndex(game => game.id === id);
    if(gameIndex < 0){
        return res.status(400).json({ error: 'Game not found'});
    }
    gameRepository.splice(gameIndex, 1);

    return res.sendStatus(200);
});

routes.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, platform, image, totalAvailable, isAvailable } = req.body;
    const gameIndex = gameRepository.findIndex(game => game.id === id);
    if(gameIndex < 0){
        return res.status(400).json({ error: 'Game not found'});
    }
    const game = {
        id,
        title,
        price, 
        platform, 
        image, 
        totalAvailable, 
        isAvailable
    }
    gameRepository[gameIndex] = game;

    return res.json(game);
})

//rotas /users
routes.get('/users', (req, res) => {
    return res.json(usersRepository);
});

routes.post('/users', (req, res) => {
    const { name, email, phone, image, age } = req.body;

    const user = {
        id: uuid(),
        name,
        email,
        phone,
        image,
        age
    };
    usersRepository.push(user);
    return res.json(user);
});

routes.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, image, age } = req.body;
    const userIndex = usersRepository.findIndex(user => user.id === id);
    if(userIndex < 0){
        return res.status(400).json({ error: 'User not found'});
    }
    const user = {
        id,
        name,
        email,
        phone,
        image,
        age
    }
    usersRepository[userIndex] = user;
    return res.json(user);
});

routes.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = usersRepository.findIndex(user => user.id === id);
    if(userIndex < 0){
        return res.status(400).json({ error: 'User not found'});
    }
    usersRepository.splice(userIndex, 1);
    return res.sendStatus(200);
});


module.exports = routes;