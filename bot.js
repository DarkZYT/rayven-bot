const Discord = require('discord.js');
const client = new Discord.Client();
var commandPrefix = "_";
function globalVar()
{
    this.__enabled = true;    
}
var global = new globalVar();
const config = require("./config.json");
client.on('ready', () => {
    console.log('I am ready!');
    console.log('Bot got ready , join now discord!')
});
client.on('message', message => {
    if (message.channel.type !== "dm") {
    if (message.guild.commandPrefix == null) {message.guild.commandPrefix = "_"};
    if ((message.content.startsWith(message.guild.commandPrefix)) && (message.channel.type !== "dm"))
    {
    const args = message.content.slice(message.guild.commandPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "ping") {
    message.channel.send(":ping_pong: Pong! :ping_pong:")
    message.channel.send(":ping_pong: Bot Ping is about **" + client.ping + " ms** , hehe :ping_pong:")
} else if(command === "setprefix"){
    if (args[0] != undefined)
    {
        if (args[0].length == 1)
        {
            message.guild.commandPrefix = args[0];
            message.channel.send("**Server Prefix** has been set to : " + args[0]);
        }
        else
        {
            message.channel.send(":x: Prefix should contain only one letter/symbol.")
        }
    } else {
        message.channel.send(":x: **Please precise a symbol**")
    }
} else if(command === "say")
    {
        if(args[0] != undefined)
        {
	    message.delete();
            message.channel.send(message.content.replace(message.guild.commandPrefix + "say ",""));
        } else {
            message.channel.send("**LOL!** You want me to send an empty message?! You such a stupid.")
        }
    } else if(command === "help")
    {
	message.react("👍");
        message.author.createDM();
        message.author.send("*Server " + message.guild.name + "'s prefix : " + message.guild.commandPrefix + "*\n\n**Bot commands :**\n			    \n	**setprefix :** Sets the prefix of the commands\n		Syntax : *setprefix <symbol>*\n\n	**help :** Sends you a DM about specific server help.\n		Syntax : *help*\n\n	**ttt :** Command list for tic-tac-toe game.\n		Syntax : *ttt <start/join/leave>*\n			 *ttt do <letter>*\n\n	**contact :** Sends a message to bot's developper.\n		Syntax : *contact <message>*\n\n	**say :** Makes the bot say something.\n		Syntax : *say <message>*\n\n	** ping :** Info about bot's connection latency.\n		Syntax : *ping*");
    } else if(command === "contact") {
        if(args[0] != undefined)
        {
            var keys = "abcdefghijklmnopqrstuvwxyz1234567890_";
            var msgId = keys.charAt(parseInt(Math.random() * keys.length)) + keys.charAt(parseInt(Math.random() * keys.length)) + keys.charAt(parseInt(Math.random() * keys.length)) + keys.charAt(parseInt(Math.random() * keys.length)) + keys.charAt(parseInt(Math.random() * keys.length)) + keys.charAt(parseInt(Math.random() * keys.length))
            eval("global.msg_" + msgId + " = message.author;")
            client.guilds.find("name","NightFallerLegendsCommunity").owner.send("**[" + msgId + "] " + message.author.tag + " told you : **" + message.content.replace(message.guild.commandPrefix + "contact ",""));
            message.channel.send("Successfully sent message to my developper.");
        } else {
            message.channel.send("**Sorry** but your message is empty.")
        }
    }else if(command === "ttt")
    {
        if ((args[0] === "join") || (args[0] === "start") || (args[0] === "s") || (args[0] === "j")) {
            if((message.channel.xogameStarted == null) || (message.channel.xogameStarted == false))
            {
                if ((message.channel.xogameP1 == message.author) || (message.channel.xogameP2 == message.author))
                {
                    message.channel.send("You're already in game!");
                }
                else if (message.channel.xogamePlayers == 1)
                {
                    message.channel.xogameStarted = true;
                    message.channel.xogameP2 = message.author;
		    message.channel.send("<@" + message.author.id +"> joined the game **(2/2)**")
                    for(x = 1;x <= 9;x++)
                    {
                        var str = "abcdefghi";
                        eval("message.channel.xogameCoor" + x + " = ':regional_indicator_" + str.charAt(x-1) +": '");
                    }
                    message.channel.send("**Game has started !** <@" + message.channel.xogameP1.id + "> 's turn : ");
                    message.channel.send(message.channel.xogameCoor1 + message.channel.xogameCoor2 + message.channel.xogameCoor3 + "\n" + message.channel.xogameCoor4 + message.channel.xogameCoor5 + message.channel.xogameCoor6 + "\n" + message.channel.xogameCoor7 + message.channel.xogameCoor8 + message.channel.xogameCoor9);
                    message.channel.xogameTurn = message.channel.xogameP1;
                } else {
                    message.channel.xogamePlayers = 1;
                    message.channel.xogameP1 = message.author;
		    message.channel.send("<@" + message.author.id +"> joined the game **(1/2)**");
                }
            } else {
                if ((message.channel.xogameP1 != message.author) && (message.channel.xogameP2 != message.author))
                {
                message.channel.send("A tic-tac-toe game has already started in this channel.")
                } else {
                message.channel.send("You're already in this channel's game.")   
                }
            }
        } else if (args[0] === "do")
        {
            if((message.channel.xogameStarted != null) && (message.channel.xogameStarted != false))
            {
                if ((message.channel.xogameP1 == message.author) || (message.channel.xogameP2 == message.author))
                {
                    if (message.channel.xogameTurn == message.author)
                    {
                        var str = "abcdefghi";
                        if (str.indexOf(args[1].toLowerCase()) != -1)
                        {
                            if (message.channel.xogameP1 == message.author)
                            {
								if (eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) != ':x: ') || (eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) != ':o: '))){
                                        eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) + " = ':x: '")
                                        message.channel.send("<@" + message.author.id + "> have checked a case !");
                                        message.channel.send(message.channel.xogameCoor1 + message.channel.xogameCoor2 + message.channel.xogameCoor3 + "\n" + message.channel.xogameCoor4 + message.channel.xogameCoor5 + message.channel.xogameCoor6 + "\n" + message.channel.xogameCoor7 + message.channel.xogameCoor8 + message.channel.xogameCoor9);
                                        if (((message.channel.xogameCoor1 == ":x: ") && (message.channel.xogameCoor2 == ":x: ") && (message.channel.xogameCoor3 == ":x: ")) || ((message.channel.xogameCoor4 == ":x: ") && (message.channel.xogameCoor5 == ":x: ") && (message.channel.xogameCoor6 == ":x: ")) || ((message.channel.xogameCoor7 == ":x: ") && (message.channel.xogameCoor8 == ":x: ") && (message.channel.xogameCoor9 == ":x: ")) || ((message.channel.xogameCoor1 == ":x: ") && (message.channel.xogameCoor4 == ":x: ") && (message.channel.xogameCoor7 == ":x: ")) || ((message.channel.xogameCoor2 == ":x: ") && (message.channel.xogameCoor5 == ":x: ") && (message.channel.xogameCoor8 == ":x: ")) || ((message.channel.xogameCoor3 == ":x: ") && (message.channel.xogameCoor6 == ":x: ") && (message.channel.xogameCoor9 == ":x: ")) || ((message.channel.xogameCoor1 == ":x: ") && (message.channel.xogameCoor5 == ":x: ") && (message.channel.xogameCoor9 == ":x: ")) || ((message.channel.xogameCoor3 == ":x: ") && (message.channel.xogameCoor5 == ":x: ") && (message.channel.xogameCoor7 == ":x: ")))
                                        {
                                            message.channel.send("** <@" + message.author.id + "> has won the game! GG WP !**");
                                            message.channel.send("*Sorry <@" + message.channel.xogameP2.id + "> for loosing , next time maybe");
                                            message.channel.xogameStarted = false;
                                            message.channel.xogamePlayers = 0;
					    message.channel.xogameP1 = null;
				  	    message.channel.xogameP2 = null;
                                        } else if ((message.channel.xogameCoor1.length < 6) && (message.channel.xogameCoor2.length < 6) && (message.channel.xogameCoor3.length < 6) && (message.channel.xogameCoor4.length < 6) && (message.channel.xogameCoor5.length < 6) && (message.channel.xogameCoor6.length < 6) && (message.channel.xogameCoor7.length < 6) && (message.channel.xogameCoor8.length < 6) && (message.channel.xogameCoor9.length < 6)){
					    message.channel.send("**Match Tied!** All cases have been checked , game is done!")
					    message.channel.send("**GG!** <@" + message.channel.xogameP1.id + "> and <@" + message.channel.xogameP2.id + "> !")
					    message.channel.xogameStarted = false;
                                            message.channel.xogamePlayers = 0;
				            message.channel.xogameP1 = null;
				  	    message.channel.xogameP2 = null;
					} else {
                                            message.channel.xogameTurn = message.channel.xogameP2;
                                            message.channel.send("It's <@" + message.channel.xogameP2.id + "> 's turn now!")
                                        }
								} else {
									message.channel.send("That case is already checked!")
								}
                            } else if (message.channel.xogameP2 == message.author)
							{
                                    if ((eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) != ':x: ') || (eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) != ':o: ')))) {
                                        eval("message.channel.xogameCoor" + (str.indexOf(args[1].toLowerCase()) + 1) + " = ':o: '");
                                        message.channel.send("<@" + message.author.id + "> have checked a case !");
                                        message.channel.send(message.channel.xogameCoor1 + message.channel.xogameCoor2 + message.channel.xogameCoor3 + "\n" + message.channel.xogameCoor4 + message.channel.xogameCoor5 + message.channel.xogameCoor6 + "\n" + message.channel.xogameCoor7 + message.channel.xogameCoor8 + message.channel.xogameCoor9);
                                        if (((message.channel.xogameCoor1 == ":o: ") && (message.channel.xogameCoor2 == ":o: ") && (message.channel.xogameCoor3 == ":o: ")) || ((message.channel.xogameCoor4 == ":o: ") && (message.channel.xogameCoor5 == ":o: ") && (message.channel.xogameCoor6 == ":o: ")) || ((message.channel.xogameCoor7 == ":o: ") && (message.channel.xogameCoor8 == ":o: ") && (message.channel.xogameCoor9 == ":o: ")) || ((message.channel.xogameCoor1 == ":o: ") && (message.channel.xogameCoor4 == ":o: ") && (message.channel.xogameCoor7 == ":o: ")) || ((message.channel.xogameCoor2 == ":o: ") && (message.channel.xogameCoor5 == ":o: ") && (message.channel.xogameCoor8 == ":o: ")) || ((message.channel.xogameCoor3 == ":o: ") && (message.channel.xogameCoor6 == ":o: ") && (message.channel.xogameCoor9 == ":o: ")) || ((message.channel.xogameCoor1 == ":o: ") && (message.channel.xogameCoor5 == ":o: ") && (message.channel.xogameCoor9 == ":o: ")) || ((message.channel.xogameCoor3 == ":o: ") && (message.channel.xogameCoor5 == ":o: ") && (message.channel.xogameCoor7 == ":o: ")))
                                        {
                                            message.channel.send("** <@" + message.author.id + "> has won the game! GG WP !**");
                                            message.channel.send("*Sorry <@" + message.channel.xogameP1.id + "> for loosing , next time maybe");
                                            message.channel.xogameStarted = false;
                                            message.channel.xogamePlayers = 0;
				            message.channel.xogameP1 = null;
				  	    message.channel.xogameP2 = null;
                                        } else if ((message.channel.xogameCoor1.length < 6) && (message.channel.xogameCoor2.length < 6) && (message.channel.xogameCoor3.length < 6) && (message.channel.xogameCoor4.length < 6) && (message.channel.xogameCoor5.length < 6) && (message.channel.xogameCoor6.length < 6) && (message.channel.xogameCoor7.length < 6) && (message.channel.xogameCoor8.length < 6) && (message.channel.xogameCoor9.length < 6)){
					    message.channel.send("**Match Tied!** All cases have been checked , game is done!")
					    message.channel.send("**GG!** <@" + message.channel.xogameP1.id + "> and <@" + message.channel.xogameP2.id + "> !")
					    message.channel.xogameStarted = false;
                                            message.channel.xogamePlayers = 0;
				            message.channel.xogameP1 = null;
				  	    message.channel.xogameP2 = null;
					} else {
                                            message.channel.xogameTurn = message.channel.xogameP1;
                                            message.channel.send("It's <@" + message.channel.xogameP1.id + "> 's turn now!")
                                        }
									} else {
										message.channel.send("That case is already checked!");
									}
                            }
                        } else {
                            message.channel.send("Please specify a correct letter.")
                        }
                    } else {
                        message.channel.send("It's not your turn , <@" + message.author.id + "> !")
                    }
                }
                else {
                    message.channel.send("You're not in the game.");
                }
            } else {
                message.channel.send("No game is running in this channel.")
            }
        } else if ((args[0] === "leave") || (args[0] === "l") || (args[0] === "quit") || (args[0] === "q") || (args[0] === "exit")){
			if ((message.channel.xogameStarted != null) && (message.channel.xogameStarted != false) && ((message.channel.xogameP1 == message.author) || (message.channel.xogameP2 == message.author)))
			{
				if (message.channel.xogameP1 == message.author)
				{
					message.channel.send("* <@" + message.author.id + "> has left the game. *")
					message.channel.send("** <@" + message.channel.xogameP2.id + "> has won the game! GG WP !**");
                    message.channel.send("*Sorry <@" + message.author.id + "> for loosing , next time maybe");
                    message.channel.xogameStarted = false;
                    message.channel.xogamePlayers = 0;
				} else {
					message.channel.send("* <@" + message.author.id + "> has left the game. *")
					message.channel.send("** <@" + message.channel.xogameP1.id + "> has won the game! GG WP !**");
                    message.channel.send("*Sorry <@" + message.author.id + "> for loosing , next time maybe");
                    message.channel.xogameStarted = false;
                    message.channel.xogamePlayers = 0;
				}
			} else {
				message.channel.send("You're not in a game.")
			}
		} else {
            message.channel.send("Possible sub-commands : join,start,do <letter>,leave");
        }
    } else if(command === "report") {
	if ((args[0]!=null) && (args[1]!=null))
	{
		if(message.guild.reportChannel != null)
		{
			if (message.guild.members.find("id",args[0].replace("<@","").replace(">","")) != null)
			{
				message.channel.send("**User was successfully reported.**");
				message.guild.owner.send("```Report from your server : " + message.guild.name + "```\n **User :** " + message.guild.members.find("id",args[0].replace("<@","").replace(">","")).tag + " **was reported by user : **" + message.author.tag + " ** for reason :** \n" + message.content.replace(message.guild.commandPrefix + "report " + args[0],""));
				message.guild.reportChannel.send("```Report```\n **User :** <@" + message.guild.members.find("id",args[0].replace("<@","").replace(">","")).id + "> **was reported by user : **<@" + message.author.id + "> ** for reason :** \n" + message.content.replace(message.guild.commandPrefix + "report " + args[0],""))
			} else {
				message.channel.send("Cannot find that user.")
			}
		} else {
			message.channel.send("You should define a reporting channel first, use *" + message.guild.commandPrefix + "setreportchannel* in the channel you want to define as reporting channel.")
		}
	} else {
		message.channel.send("Correct usage : " + message.guild.commandPrefix + "*report <user> <message>*");
	}
    } else if(command === "setreportchannel"){
	message.guild.reportChannel = message.channel;
	message.channel.send("Reports channel have been successfully set to : <@" + message.channel.id + ">");
    } else {
        message.channel.send("Unknown command, try '" + message.guild.commandPrefix + "help' for a list of commands.")
    }
}
} else {
    if (message.author.id == client.guilds.find("name","NightFallerLegendsCommunity").owner.id)
    {
        const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if(command === "reply")
        {
            if((args[0] != null) && (args[1] != null))
            {
                if (eval("(global.msg_" + args[0] + " != null)"))
                {
                    eval("global.msg_" + args[0]).lastMessage.channel.send("**Developper replied to you, <@" + eval("global.msg_" + args[0]).id + "> :** " + message.content.replace(message.content.charAt(0) + "reply " + args[0],""));
                } 
                else
                {
                    message.channel.send("Couldn't find that user, sir.")
                }
            } else {
                message.channel.send("You left one of the arguments empty , sir.")
            }
        } else {
            message.channel.send("I can't understand this command , sir.")
        }
    } else {
        message.author.send("**Only admins and owner can use commands through DM.**");
    }
}});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
