/**
 * @param {import("../../src/index").bot} bot 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports = async function (bot, interaction) {
    if (interaction.type === 2) {
        await bot.commands.get(interaction.commandName).run(bot, interaction).catch(function (e) {
            interaction.reply({ content: `\`\`\`${e.stack}\`\`\``, flags: 64 });
        });
    };
    if (interaction.type === 3) {
        let modal = interaction.customId.split("-")[0]
        let args = interaction.customId.split('-').slice(1).join('-')
        switch (interaction.componentType) {
            case 2: {
                bot.buttons.get(modal).run(bot, interaction, args).catch(function (e) {
                    interaction.reply({ content: `\`\`\`${e.stack}\`\`\``, flags: 64 });
                });
                break;
            }
            default: {
                interaction.reply({ content: "Unknown component type.", flags: 64 });
            }
        };
    };
    if (interaction.type === 5) {
        let modalId = interaction.customId.split('-')[0];
        let args = interaction.customId.split('-').slice(1).join('-');
        try {
            bot.modal.get(modalId).run(bot, interaction, args)
        } catch (e) {
            interaction.reply({ content: `\`\`\`${e.stack}\`\`\``, flags: 64 });
        }
    }
}   