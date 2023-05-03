/**
 * @param {Object} dependencies
 * @param {import("moment")} dependencies.moment
 */
export default function({ moment }) {
  const format = "YYYY-MM";
  const pattern = "^20[0-9]{2}-[0-9]{2}$";

  function object(month) {
    return moment(month, format);
  }

  function from(obj){
    return obj.format(format);
  }

  function next(month) {
    return object(month)
      .add(1, "month")
      .format(format);
  }

  function prev(month) {
    return object(month)
      .subtract(1, "month")
      .format(format);
  }

  function current() {
    return from(moment());
  }

  function last() {
    return prev(current());
  }

  return {
    pattern,
    object,
    from,
    next,
    prev,
    current,
    last,
  };
}
