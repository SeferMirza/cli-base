import moment from "moment";
import prompt from "prompt";

import Cli from "./Cli.js";
import Command from "./Command.js";
import month from "./month.js";
import question from "./question.js";

const $Cli = () => Cli(context);
const $Command = () => Command(context);
const $month = () => month(context);
const $question = () => question(context);

const context = {
  args: process.argv.slice(2),
  console,
  moment,
  prompt,

  $Cli,
  $Command,
  $month,
  $question
};

export default context;
