import { screen, render } from "@testing-library/react";
import MemoAdd from "./MemoAdd";
// import userEvent from "@testing-library/user-event";
test("MemoAdd element check", () => {
  render(<MemoAdd />);
  screen.getByRole("button", { name: "Add Memo" });
  screen.getByTestId("memoTitle");
  screen.getByTestId("memoDetails");
});
