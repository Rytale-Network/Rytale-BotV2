const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')
const Discord = require("discord.js");
module.exports = {
  description: 'Evaluates code',
  minArgs: 1,
  maxArgs: -1,
  correctSyntax: 'Correct syntax: {PREFIX}eval {ARGS}',
  expectedArgs: '[code]',
  type: 'legacy',
  testOnly: true,
  reply: false,
  guildOnly: true,
  ownerOnly: true,

  callback: async({ args , message}) => {

    let NValidEVAL = new EmbedBuilder()
      // .setAuthor(" ⛔ Action | EVAL")
      .setColor("#ff0000")
      .addField("Executor", `<@${message.author.id}>`)
      .addField(
        ":outbox_tray: Output",
        `\`\`\`diff\n Error: Not a valid Eval\`\`\``
      )
      .addField(
        ":white_check_mark: Solution",
        `\`\`\`diff\n ${data.config.prefix}Eval {code}\`\`\``
      )
      .setFooter(data.config.footer + data.config.version);
    if (
      message.author.id !== "259875874046738432" &&
      message.author.id !== "342796453477089281" &&
      message.author.id !== "260594090255712258" &&
      message.author.id !== "706984059183693854" &&
      message.author.id !== "750880076555354185"
    )
      return message.channel.send(`This is a developer only command.`);
    if (!args[0]) return message.channel.send(NValidEVAL);

    var testArr = ["a", "b", "c", "d"];
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      var output = true;
      let code = args.join(" ");
      if (code.startsWith("```js") && code.endsWith("```"))
        code = code.slice(5, -3);
      if (args[0].toLowerCase() == "async")
        code = `(async function(){\n${code.slice(5)}\n})(client, message)`;
      let evaled = await eval(code);
      let rawEvaled = evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, {
          depth: 0,
        });
      let dataType = Array.isArray(rawEvaled) ? "Array<" : typeof rawEvaled,
        dataTypes = [];
      if (~dataType.indexOf("<")) {
        rawEvaled.forEach((d) => {
          if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
          dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
        });
        dataType +=
          dataTypes.map((s) => s[0].toUpperCase() + s.slice(1)).join(", ") +
          ">";
      }
      // The Embed for the result of the EVAl
      let EvalResult = new EmbedBuilder()
        .setTitle(
          `Evaluated in ${Math.round(Date.now() - message.createdTimestamp)}ms`
        )
        .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField(
          ":outbox_tray: Output",
          `\`\`\`js\n${clean(evaled)
            .slice(0, 1000)
            .replace(client.token, "You really think im giving that out?")
            .replace(
              `mongodb+srv://RytaleBot:<pass>@​cluster0.vshit.mongodb.net/Rytale?retryWrites=true&w=majority`,
              "You really think im giving that out?"
            )}\n\`\`\``
        )
        // .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).slice(0, 1000)}\n\`\`\``)
        .addField(
          "Type",
          `\`\`\`xl\n${
            dataType.substr(0, 1).toUpperCase() + dataType.substr(1)
          }\n\`\`\``
        )
        .setColor("GREEN");

      if (output) message.channel.send(EvalResult);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
  },
}
