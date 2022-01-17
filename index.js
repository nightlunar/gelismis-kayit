const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, createMessageComponentCollector } = require('discord.js');
const client = global.client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
 
});
const { Database } =  require('ready.db')
const  db  =  new  Database("settings.json")
client.login("token")

client.once("ready", async() => {
  console.log("Bot Başarıyla giriş yaptı!")
});

client.on("messageCreate", async message => {
if (message.channel.id == "932251170897006653") {

if (message.content != "!kayıt") {
  if(message.author.id === client.user.id) return;
  setTimeout(() => message.delete(), 2000)
}

  if (message.content == "!kayıt") {
    /*kayıt*/
    

   
const row2 = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
    .setCustomId('where')
    .setPlaceholder('Birisini seç?')
    .addOptions([
      {
        label: 'youtube',
        value: 'yt',
      },
      {
        label: 'url',
        value: 'url',
      },
      {
        label: 'bir arkadaşım tavsiye etti',
        value: 'friend',
      },
    ]),
);

message.author.send('**----- BİR FORM BAŞLADI -----**')
.catch(() => message.reply({ephermal: true, content: 'Görünüşe göre özel mesajların kapalı,\nAçtıktan sonra komudu bir daha girebilirsin.'}).then(msg => setTimeout(() => msg.delete(), 10000))
)
message.author.send({ content: '**Plasmic sunucusunu nereden buldun?**', components: [row2] })
.catch(() => console.log("had to pass an arguement to do nothing")
)

setTimeout(() => message.delete(), 5000)
}
}



})

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
  if (interaction.customId === 'where') {
    const row = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
    .setCustomId('age')
    .setPlaceholder('Kaç yaşındasın?')
    .addOptions([
      {
        label: '8-12 Yaş aralığı',
        description: '8-12 yaşları arasında isen bu tuşa tıkla',
        value: '8',
      },
      {
        label: '13-19 Yaş aralığı',
        description: '13-19 yaşları arasında isen bu tuşa tıkla',
        value: '13',
      },
      {
        label: '20+ Yaş aralığı',
        description: '20 yaşından büyüksen bu yaş aralığını seç.',
        value: '20',
      },
    ]),
);
    interaction.update({ content: '**Kaç yaşındasın?\n||YAŞIN HAKKINDA YALAN SÖYLEDİĞİNİ ÖĞRENİRSEK SUNUCUDAN ATILIRSIN.||**', components: [row] })
    .catch(() => console.log("had to pass an arguement to do nothing")
    )
  }
	if (interaction.customId === 'age') {
    if (interaction.values[0] == '8') {
      const member = interaction.user
      console.log(member)
     // message.guild.members.cache.get(interaction.member.id)
      const ROW = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setLabel('Evet 8-12 yaşındayım')
					.setStyle('PRIMARY'),
          new MessageButton()
					.setCustomId('no')
					.setLabel('Hayır 8-12 yaşında değilim.')
					.setStyle('DANGER'),
			);
     await interaction.update({ content: "yaşının **8-12** arasında olduğunu kabul ediyormusun", components: [ROW]}) 

 /*    client.guilds.cache.forEach(a => {
        member.send("yaşın tutmadığı için banlandın cancığım")
          a.members.ban(member.id)
  })
*/


    } else {
      let server = client.guilds.cache.get('760511134079254610')
      var memberRole = server.roles.cache.find(role => role.name === "Topluluk")
      let person = server.members.cache.get(interaction.user.id)
      
      person.roles.add(memberRole)   
         await interaction.update({ content: 'Yaş seçilmiştir, geri alınamaz.', components: [] });

    }

      

	}});


  client.on('interactionCreate', async interaction => {
    i = interaction
    const member = interaction.user

    if (i.customId === 'yes') {
      await i.user.send({ content: 'Yaşının **8-12** arasında olduğunu kabul ettin', components: [] });
      client.guilds.cache.forEach(a => {
        member.send("yaşın tutmadığı için banlandın cancığım")
          a.members.ban(member.id) })
    }
    if (i.customId === 'no') {
      await i.update({ content: 'baştan başla.', components: [] });
      }
  });

  client.on('guildMemberAdd', async (member, guild) => {
      member.guild.channels.cache.get('932251170897006653').send(`<@${member.id}>`)
      .then(msg => {
        setTimeout(() => msg.delete(), 1000)
      }) 
      .catch(console.error);
      member.user.send(`<@${member.id}> - 5 Dakika içinde hesabını doğrulamazsan sunucudan atılacaksın.`)

      setTimeout(function() { // Setup a timer
        if(member.roles.cache.find(r => r.name === "Topluluk")){
          return;
              }

          member.user.send(`<@${member.id}> - Plasmice zamanında girmediğin için atıldın, geri girmek istersen: discord.gg/javascript`).then((a) => {
          client.guilds.cache.forEach(a => {
              a.members.kick(member.id) })
            });

    }, 300000); // 5 seconds in milliseconds
    


      
  });
    
