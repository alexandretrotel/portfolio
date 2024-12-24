import { handleKeyDown } from "../handleKeyDown";

describe("handleKeyDown", () => {
  it("should set the direction to the new direction if it is not the opposite of the current direction", () => {
    const setDirection = jest.fn();
    const direction = [1, 0];
    const e = { key: "ArrowUp" } as KeyboardEvent;

    handleKeyDown(e, direction, setDirection);

    expect(setDirection).toHaveBeenCalledWith([0, -1]);
  });
});
