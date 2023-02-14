const simplydjs = require("simply-djs");

module.exports = {
    config: {
      name: "крестики-нолики",
      description: "Мини игра: крестики-нолики.",
      usege: "крестики-нолики [пользователь]"
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async (client, message, args, prefix) => {
        simplydjs.tictactoe(message);
    }
};