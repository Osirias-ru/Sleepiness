const simplydjs = require("simply-djs");

module.exports = {
    name: "тестэмбед",
    description: "Опубликуй свой эмбед",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    run: async (client, interaction, config, db) => {
        simplydjs.embedCreate(interaction)
    },
};