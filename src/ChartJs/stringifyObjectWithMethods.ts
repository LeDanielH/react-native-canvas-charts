export function stringifyObjectWithMethods<TObjectType>(obj: TObjectType) {
  const functionsList: string[] = [];

  function jsonStringifyReplacer(_key: unknown, value: unknown) {
    if (typeof value === "function") {
      functionsList.push(value.toString());
      return "{func_" + (functionsList.length - 1) + "}";
    }
    return value;
  }

  function regexFunctionReplacer(_match: string, id: number) {
    return functionsList[id];
  }

  return JSON.stringify(obj, jsonStringifyReplacer) // generate json with "functionName": "function() {}"
    .replace(/"{func_(\d+)}"/g, regexFunctionReplacer); // json with "functionName": function() {}
}
