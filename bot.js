const Discord = require('discord.js');
const client = new Discord.Client();
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const prefix = "rayven "
var answers = ["Well , maybe.","Not at all.","I can't understand.","Really, this question?","Probably.","I guess not.","Yeah!","You should think about your question twice.","Nope , lol.","Ask yourself.","I guess so , yeah ^^.","Uh... I don't really know.","Yes , and I'm sure what I'm saying."]
var killgifs = ["http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif.gif",
		"http://68.media.tumblr.com/c9340ffe7bd88258ec374a9cdf571ec3/tumblr_okxuc75yRi1w0ii2ho1_400.gif",
		"http://38.media.tumblr.com/b3623de17160edc374a39393dd50e645/tumblr_nglsxnrwyD1rbrys3o1_500.gif",
		"http://33.media.tumblr.com/40a731a1738c34d8b7533e080b72ba73/tumblr_ngls0ixVFl1rbrys3o1_500.gif",
		"http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif-10.gif",
		"https://media1.tenor.com/images/46051e203deaefc5642916c1eafa54a7/tenor.gif?itemid=3660367",
		"http://reve-of-manga.r.e.pic.centerblog.net/f02b366e.gif",
		"https://media.giphy.com/media/9J3GfSohn0HRK/giphy.gif",
		"http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif-9.gif",
		"https://i.gifer.com/9hxn.gif",
		"http://reve-of-manga.r.e.pic.centerblog.net/a8a9bf5e.gif",
		"http://38.media.tumblr.com/3526f49bd5c2f57de0484c2913076fc1/tumblr_n919vrTuyV1rhtveio1_500.gif"]
function globalVar()
{
    this.__enabled = true;    
}
var global = new globalVar();
  var play = function(msg, suffix) {
    var voiceChannel = msg.member.voiceChannel;
    msg.channel.send('```Searching...```').then(response => {
      var searchstring = suffix;

      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix;
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit('Invalid video!');
        }

        response.edit('```Queued: ' + info.title + "```").then(() => {
	  if (msg.guild.queue == null){msg.guild.queue = [];}
          msg.guild.queue.push({
            'name': info.title,
            'url': info.webpage_url,
            'requested_by': msg.author.id,
          });
          if (msg.guild.queue.length === 1) playQueue(msg, suffix);
        }).catch(console.log);
      });
    }).catch(console.log);
  };

  var skipCurrentSong = function(msg){
	if (msg.guild.queue == null){msg.guild.queue = [];}
	if (msg.guild.queue.length !== 0)
	{
		if (msg.guild.joinedChannel != null)
		{
			msg.channel.send("```Skipped : " + msg.guild.queue.shift().name + "```")
			playQueue(msg,"");
		} else {
			msg.channel.send("**I'm not in a voice channel**")
		}
	} else {
		msg.channel.send("**Queue is already empty.**")
	}
  }
  var stopQueue = function(msg){
  if (msg.guild.joinedChannel !== null)
  {
	  msg.guild.queue = [];
	  msg.guild.joinedChannel.leave();
	  msg.guild.joinedChannel = null;
	  msg.channel.send("**Cleared queue and left all voice channels**")
  } else {
	  msg.channel.send("I'm not currently in a voice channel");
  }
  }
  var showQueue = function(msg) {
	  var queues = "```Queue list :\n";
	  if (msg.guild.queue == null){msg.guild.queue = [];}
		if(msg.guild.queue.length == 0){msg.channel.send("```Queue is empty.```"); return;}
	  for(i = 0;msg.guild.queue[i] != null;i++)
	  {
			if(msg.guild.queue[i+1] != null){
		  queues += (i+1) + " - " + msg.guild.queue[i].name + "\n";
			} else {
			queues += (i+1) + " - " + msg.guild.queue[i].name;
			}
	  }
		queues += "```";
		msg.channel.send(queues)
  }
  var joinChannel = function(msg){
    if(msg.member.voiceChannel != null)
    {
	msg.member.voiceChannel.join()
	msg.channel.send("**Joined : " + msg.member.voiceChannel.name + "**")
	    if(msg.guild.queue.length != 0)
			{
				playQueue(msg,"");
			}
    } else {
	msg.channel.send("You're not currently on a voice channel.")    
    }
  }
  var playQueue = function(msg, suffix, voiceChannel = msg.member.voiceChannel) {
    msg.guild.joinedChannel = voiceChannel;
    voiceChannel.join()
      .then(connection => {
        var stream = ytdl(msg.guild.queue[0].url, {
          audioonly: true,
          quality: 'highestaudio'
        });
        return connection.playStream(stream, {
          seek: 0,
          volume: 1
        });
      })
      .then(dispatcher => {
        dispatcher.on('error', error => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);

          console.error;
        });

        dispatcher.on("end", end => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		  msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);
        });
      })
      .catch(console.error);
      
      return module;
  };

function showError(message,err){
	message.channel.send(":no_entry: **A error has occured while performing this execution.** Please report this to <@!458310531531669514> .\n```js\n"+err+"\n```")		
}

client.on('ready', () => {
    console.log('Rayven is ready , connected to '+client.guilds.size+' guilds !');
	client.user.setPresence({ game: { name: 'against Samantha' }, status: 'idle' })
  	.then()
  	.catch(err => { console.log(err);});
});
client.on('message', message => {
	try{
	var command = message.content.replace(prefix,"").split(" ")[0].toLowerCase();
	var args = message.content.replace(prefix + command + " ","").split(" ");
	if(!message.content.startsWith(prefix)) return;
	if(command === "ping"){
		var embed = new Discord.RichEmbed()
		.setColor("42F46B")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.addField("Pong!","My ping is currently **" + (client.ping|0) + "** ms.");
	   	message.channel.sendEmbed(embed)
			.then()
			.catch(err =>{
				showError(message,err);
			});
	} else if(command === "debug"){
		try{
			message.channel.send("**Input:**\n```js\n"+args.join(" ")+"\n```\n**Output:**\n```js\n"+eval(args.join(" "))+"\n```");	
		}catch(err){
			message.channel.send("**Input:**\n```js\n"+args.join(" ")+"\n```\n**Caught error:**\n```js\n"+err+"\n```");
		}
	} else if(command === "answer"){
		if(args[0] == null){
			message.channel.send(":no_entry: **Please specify a question.**");
		} else {
			message.channel.send(answers[Math.floor(Math.random()*answers.length)])
				.then()
				.catch(err => {
					showError(message,err);
				});
		}
	} else if(command === "play"){
		if(args[0] != null){
			play(message,args.join(" "));
		} else {
			message.channel.send(":no_entry: **Please specify a song/URL.**");	
		}
	} else if(command === ("showqueue" || "queue" || "songlist" || "nowplaying")){
		showQueue(message);
	} else if(command === (("skip") || ("jump"))){
		skipCurrentSong(message);
	} else if(command === (("stop") || ("purge") || ("clear"))){
		stopQueue(message);
	} else if(command === (("join") || ("joinme") || ("come"))){
		joinChannel(message);
	} else if (command === "kill"){
		var embed = new Discord.RichEmbed()
		.setColor("F44242")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.setImage(killgifs[Math.floor(Math.random()*killgifs.length)]);
		try{
			embed = embed.addField("Murder!","Killed **" + message.mentions.members.first() + "** , must have been a real baka!");
		}catch(err){	
			embed = embed.addField("Murder!","Killed **" + message.member.displayName + "** , must have been a real baka!")
		}
		message.channel.sendEmbed(embed);
	} else if(command === "help"){
		var embed = new Discord.RichEmbed()
		.setColor("D3F441")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity")
		.addField("Help?!","**help :** Shows the help menu.\n**ping :** Info about bot's latency.\n**play :** Queues/plays a song.\n**stop :** Stops the queue.\n**showqueue :** Shows the queue list.\n**join :** Joins your voice channel.\n**kill :** Kills a baka.\n");
		message.channel.sendEmbed(embed);
	} else {
		message.reply("**Yes?** Say `rayven help` for a list of help.")	
	}
	}catch(err){
		showError(message,err);
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


