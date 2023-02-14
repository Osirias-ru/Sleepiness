const simplydjs = require("simply-djs");

module.exports = {
    name: "крестики-нолики",
    description: "Мини игра: крестики-нолики",
    type: 1,
    options: [
        {
            type: 6, name: 'вызваю', description: 'Пользователь которого вы вызываете на бой.',
            required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    run: async (client, interaction, config, db) => {
        simplydjs.tictactoe(interaction);
    },
};