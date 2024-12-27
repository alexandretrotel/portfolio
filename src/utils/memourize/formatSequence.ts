export const formatSequence = (sequence: string) => {
  return (
    sequence
      .split("")
      .reverse()
      .join("")
      .match(/.{1,3}/g)
      ?.reverse()
      .map((group) => group.split("").reverse().join(""))
      .join(" ") || sequence
  );
};
