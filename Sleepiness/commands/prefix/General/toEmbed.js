const simplydjs = require("simply-djs");

module.exports = {
    config: {
        name: "эмбед",
        description: "Создай свой эмбед.",
      },
      permissions: ['SendMessages'],
      owner: false,
      run: async (client, message, args, prefix, config, db) => {
        simplydjs.embedCreate(message)
    },
};