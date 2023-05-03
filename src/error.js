export default {
  COMMAND_expects_COUNT_arguments(command, count) {
    return new Error(`'${command}' expects ${count} arguments`);
  }
};
