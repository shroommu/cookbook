import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

describe("Home - Recipe Submission Form", () => {
  it("renders the form heading and all fields", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /submit a recipe/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Marinara Sauce")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("A delicious homemade version"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Separate each ingredient with a new line"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Separate each step with a new line"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        "Tips, variations, serving suggestions, etc.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit recipe/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting with empty required fields", async () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Ingredients are required")).toBeInTheDocument();
    expect(screen.getByText("Directions are required")).toBeInTheDocument();
    expect(
      screen.getByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).toBeInTheDocument();
  });

  it("does not show validation errors initially", () => {
    render(<Home />);

    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Ingredients are required"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Directions are required"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("clears field error when user types in that field", async () => {
    const user = userEvent.setup();
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));
    expect(screen.getByText("Title is required")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Marinara Sauce"), "My Cake");

    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
  });

  it("re-shows field error when user clears a required field after submit", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByPlaceholderText("Marinara Sauce"), "My Cake");
    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));

    // Title is filled but ingredients/directions are empty
    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    expect(screen.getByText("Ingredients are required")).toBeInTheDocument();
  });

  it("submits successfully when all required fields are filled", async () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<Home />);

    await user.type(
      screen.getByPlaceholderText("Marinara Sauce"),
      "Chocolate Cake",
    );
    await user.type(
      screen.getByPlaceholderText("Separate each ingredient with a new line"),
      "Flour\nSugar\nCocoa",
    );
    await user.type(
      screen.getByPlaceholderText("Separate each step with a new line"),
      "Mix dry ingredients\nBake at 350",
    );

    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));

    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Ingredients are required"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Directions are required"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).not.toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Recipe Data:",
      expect.objectContaining({
        title: "Chocolate Cake",
        ingredients: "Flour\nSugar\nCocoa",
        directions: "Mix dry ingredients\nBake at 350",
      }),
    );

    consoleSpy.mockRestore();
  });

  it("resets all fields when Reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(
      screen.getByPlaceholderText("Marinara Sauce"),
      "Chocolate Cake",
    );
    await user.type(
      screen.getByPlaceholderText("A delicious homemade version"),
      "A rich dessert",
    );

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByPlaceholderText("Marinara Sauce")).toHaveValue("");
    expect(
      screen.getByPlaceholderText("A delicious homemade version"),
    ).toHaveValue("");
  });

  it("clears submit error message after Reset", async () => {
    const user = userEvent.setup();
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));
    expect(
      screen.getByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(
      screen.queryByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("updates submit error live as required fields are filled", async () => {
    const user = userEvent.setup();
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /submit recipe/i }));
    expect(
      screen.getByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).toBeInTheDocument();

    await user.type(
      screen.getByPlaceholderText("Marinara Sauce"),
      "Chocolate Cake",
    );
    await user.type(
      screen.getByPlaceholderText("Separate each ingredient with a new line"),
      "Flour",
    );
    await user.type(
      screen.getByPlaceholderText("Separate each step with a new line"),
      "Mix and bake",
    );

    expect(
      screen.queryByText(
        /title, ingredients, and directions are required before submitting/i,
      ),
    ).not.toBeInTheDocument();
  });
});
