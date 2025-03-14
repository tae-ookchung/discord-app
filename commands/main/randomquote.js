const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { body } = require('../../quotes.json');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('randomquote')
  .setDescription('Replies with a random quote!')
  .addStringOption(option => 
    option.setName('name')
    .setDescription('Random Quote from someone specific')
    .setRequired(false)
    .addChoices(
      { name: 'gorg', value: 'gorg'},
      { name: 'tae', value: 'tae'}
    )
  ),
	async execute(interaction) {
    
  console.log(body);
  const optionName = interaction.options.getString('name');

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  let randomQuotes = body;
  console.log(randomQuotes);
  console.log('yeet');
  console.log(optionName);
  if (optionName != null) {
    randomQuotes = body.filter((el) => {
      console.log(el.name);
      return optionName === el.name;
    })
  }
  console.log(randomQuotes);
  let index = getRandomInt(0, randomQuotes.length - 1);
  let randomQuote = randomQuotes[index];

  const randomQuoteEmbed = new EmbedBuilder()
    .setColor('DarkBlue')
    .setTitle('Random Quote')
    .setAuthor({
      iconURL: 'https://cdn.discordapp.com/emojis/1204001019571478558.webp?size=96',
      name: 'TNCBOT'
    })
    .setFields(
      {
        name: '\u200B',
        value: `${randomQuote.quote}`,
        inline: false
      },
      {
        name: '\u200B',
        value: '\u200B',
      },
      {
        name: 'Said by',
        value: `${randomQuote.name}`,
        inline: true
      },
      {
        name: 'Context',
        value: `${randomQuote.context}`,
        inline: true
      },
      {
        name: 'Date',
        value: `${randomQuote.date}`,
        inline: false
      },
    )
    .setThumbnail('https://cdn.discordapp.com/emojis/1199095660394328245.gif?size=96&animated=true')

    await interaction.reply({
      embeds: [randomQuoteEmbed]
    });
  },
};