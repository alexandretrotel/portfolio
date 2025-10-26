export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("fetch failed");
      }
      return res.json();
    })
    .then((data) => data.count as number);
