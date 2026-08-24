export const formatDate = (date: Date, updated: boolean): string => {
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return updated ? `Last updated ${label}` : label;
};
