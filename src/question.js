/**
 * @param {Object} dependencies
 * @param {import("./month").default} dependencies.$month
 */
export default function({ $month }) {
  const _month = $month();

  function choice(name, choices,
    defaultChoice = undefined
  ) {
    if(Array.isArray(choices)) {
      return {
        name,
        default: defaultChoice || choices[0],
        description: `${name} (${choices.join(", ")})?`,
        conform: value => choices.includes(value)
      };
    }

    return {
      name,
      default: defaultChoice || Object.keys(choices)[0],
      description: `${name} (${Object.keys(choices).join(", ")})?`,
      conform: value => value in choices,
      before: value => {
        return choices[value];
      },
    };
  }

  function month(
    name = "month",
    defaultValue = null
  ) {
    return {
      name,
      type: "string",
      pattern: _month.pattern,
      default: defaultValue || _month.current()
    };
  }

  function number(
    name = "number",
    defaultValue = 0
  ) {
    return {
      name,
      type: "number",
      default: defaultValue,
      parse: value => parseInt(value)
    };
  }

  function text(name) {
    return {
      name,
      type: "string"
    };
  }

  function yesNo(
    name = "ok",
    defaultValue = "y"
  ){
    return {
      name,
      type: "string",
      default: defaultValue,
      before: value => value == "y",
      description: `${name}? (y/n)`
    };
  }

  return {
    choice,
    month,
    number,
    text,
    yesNo,
  };
}
