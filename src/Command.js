import error from "./error.js";

/**
 * @param {Object} dependencies
 * @param {Array.<String>} dependencies.args
 * @param {import("prompt").default} dependencies.prompt
 */
export default function({ args, prompt }) {
  function Command(name, action,
    questions = []
  ) {
    const commandArgs = args.slice(1);
    const expectedArgumentCount = questions.length * 2;

    async function answers() {
      if(questions.length <= 0) {
        return [ ];
      }

      if(commandArgs.length === 0) {
        const result = await prompt.get(questions);

        return Object.values(result);
      }

      if(commandArgs.length !== expectedArgumentCount) {
        throw error.COMMAND_expects_COUNT_arguments(name, expectedArgumentCount);
      }

      const questionIndex = questions.reduce((prev, cur) => { return { ...prev, [cur.name]: cur }; }, { });
      const result = [ ];

      for(let i = 0; i < commandArgs.length; i += 2) {
        const name = commandArgs[i].substring(2); // --question-name => question-name
        const value = commandArgs[i + 1];

        const question = questionIndex[name];
        const parse = question.parse || question.before || (v => v);

        const answer = parse(value === "_default_" ? question.default : value);

        result.push(answer);
      }

      return result;
    }

    async function run() {
      await action(...(await answers()));
    }

    return {
      name,
      run
    };
  }

  return {
    new: Command
  };
}
