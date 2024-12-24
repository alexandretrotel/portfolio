import { handleKeyDown } from "../handleKeyDown";

describe("handleKeyDown", () => {
  it("should set the direction to the new direction if it is not the opposite of the current direction", () => {
    const setDirection = jest.fn();
    const direction = "ArrowRight";
    const e = { key: "ArrowUp" } as KeyboardEvent;

    handleKeyDown(e, direction, setDirection);

    expect(setDirection).toHaveBeenCalledWith("ArrowUp");
  });

  it("should do nothing if the new direction is the opposite of the current direction", () => {
    const setDirection = jest.fn();
    const direction = "ArrowDown";
    const e = { key: "ArrowUp" } as KeyboardEvent;

    handleKeyDown(e, direction, setDirection);

    expect(setDirection).not.toHaveBeenCalled();
  });
});
