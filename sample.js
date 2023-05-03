import context from "./src/context.js";

const Cli = context.$Cli();
const Command = context.$Command();
const console = context.console;
const prompt = context.prompt;
const question = context.$question();

prompt.message = "cli-base";

const cli = Cli.new([
  Command.new("hello", async name => {
    console.log(`hello ${name}`);
  }, [ question.text("name") ])
]);

await cli.run();

