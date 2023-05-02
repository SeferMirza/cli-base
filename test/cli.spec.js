import prompt from "prompt";
import { use, should as buildShould } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import $Cli from "../src/Cli.js";
import $Command from "../src/Command.js";
import context from "../src/context.js";
import error from "../src/error.js";
import $question from "../src/question.js";

use(chaiAsPromised);
const should = buildShould();

describe("cli", () => {
  let args;
  let Cli;
  let Command;
  let mockPrompt;
  let question;

  beforeEach(() => {
    args = [ ];
    mockPrompt = sinon.mock(prompt);

    Cli = $Cli({ ...context, args, prompt });
    Command = $Command({ ...context, args, prompt });
    question = $question({ ...context });
  });

  afterEach(sinon.restore);

  it("consists of commands", () => {
    const cli = Cli.new([
      Command.new("command-1", sinon.stub()),
      Command.new("command-2", sinon.stub())]
    );

    should.exist(cli.get("command-1"));
    should.exist(cli.get("command-2"));
  });

  it("asks which command to run on start", async () => {
    const commands = [
      Command.new("command-1", sinon.stub()),
      Command.new("command-2", sinon.stub())
    ];
    const cli = Cli.new(commands);

    mockPrompt.expects("get")
      .withArgs(
        sinon.match.array
          .and(sinon.match(q => q[0].name === "command"))
          .and(sinon.match(q => q[0].description === "command (command-1, command-2)?"))
      )
      .resolves({ command: commands[1] })
      .once();

    await cli.run();

    mockPrompt.verify();
  });

  it("can read command from process args", async () => {
    args.push("a-command");
    mockPrompt.expects("get").never();

    const cli = Cli.new([ Command.new("a-command", sinon.stub()) ]);

    await cli.run();

    mockPrompt.verify();
  });

  describe("command", () => {
    it("represents an automated work to be executed", async () => {
      args.push("test");

      const action = sinon.stub();
      const cli = Cli.new([ Command.new("test", action) ]);

      await cli.run();

      action.called.should.be.true;
    });

    it("may prompt user for inputs", async () => {
      args.push("test");
      mockPrompt.expects("get")
        .withArgs(
          sinon.match.array
            .and(sinon.match(q => q[0].name === "question-1"))
            .and(sinon.match(q => q[1].name === "question-2"))
        )
        .resolves({
          "question-1": true,
          "question-2": 42
        })
        .once();

      const mockAction = sinon.mock().withArgs(true, 42).once();
      const cli = Cli.new([
        Command.new("test", mockAction, [
          question.yesNo("question-1", "n"),
          question.number("question-2", 0),
        ])
      ]);

      await cli.run();

      mockAction.verify();
    });

    it("can read those inputs from process arguments as well", async () => {
      args.push("test", "--question-1", "y", "--question-2", "42");

      const mockAction = sinon.mock().withArgs(true, 42).once();
      const cli = Cli.new([
        Command.new("test", mockAction, [
          question.yesNo("question-1", "n"),
          question.number("question-2", 0),
        ])
      ]);

      await cli.run();

      mockAction.verify();
    });

    it("gives error when number of process arguments does not match with number of command arguments", async () => {
      args.push("test", "--a-question");

      const mockAction = sinon.mock().withArgs(true, 42).once();
      const cli = Cli.new([
        Command.new("test", mockAction, [ question.yesNo("a-question") ])
      ]);

      await cli.run().should.be.rejectedWith(
        error.COMMAND_expects_COUNT_arguments("test", "2").message
      );
    });

    it("uses default value of a question when _default_ is given from args", async () => {
      args.push("test", "--a-question", "_default_");

      const mockAction = sinon.mock().withArgs(42).once();
      const cli = Cli.new([
        Command.new("test", mockAction, [ question.number("a-question", 42) ])
      ]);

      await cli.run();

      mockAction.verify();
    });
  });
});

