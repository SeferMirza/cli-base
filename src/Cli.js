/**
 * @param {Object} dependencies
 * @param {Array.<String>} dependencies.args
 * @param {import("prompt").default} dependencies.prompt
 * @param {import("./question").default} dependencies.$question
 */
export default function({ args, prompt, $question }) {
  const question = $question();

  function Cli(commands) {
    commands = commands.reduce((prev, cur) => {
      return { ...prev, [cur.name]: cur };
    }, { });

    function get(command) {
      return commands[command];
    }

    async function command() {
      if(args.length > 0) return get(args[0]);

      const { command: result } = await prompt.get([ question.choice("command", commands) ]);

      return commands[result.name];
    }

    async function run() {
      const current = await command();

      await current.run();
    }

    return {
      get,
      run
    };
  }

  return {
    new: Cli
  };
}
