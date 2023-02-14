const SnakeGame = require('snakecord');

module.exports = {
    config: {
      name: "змейка",
      description: "Мини игра: змейка.",
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async (client, message, args, prefix) => {
        const snakeGame = new SnakeGame({
            title: 'Змейка!',
            color: 'GREEN',
            timestamp: false,
            gameOverTitle: 'Игра окончена!'
        });
        return await snakeGame.newGame(message);
    }
};