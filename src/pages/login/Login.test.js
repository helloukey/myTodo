import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { AuthContextProvider } from "../../context/AuthContext";

const MockedLogin = () => {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
};

const performInputAction = async (email, password) => {
  const emailInput = screen.getByTestId("email");
  fireEvent.change(emailInput, { target: { value: email } });
  const passwordInput = screen.getByTestId("password");
  fireEvent.change(passwordInput, { target: { value: password } });
  const loginButton = screen.getByRole("button", { text: /Login/i });
  fireEvent.click(loginButton);
  const loadingButton = await screen.findByRole("button", { text: /Logging.../i });
  expect(loadingButton).toBeInTheDocument();
};

describe("check login page", () => {
  it("check login header", async () => {
    render(<MockedLogin />);
    const loginHeader = await screen.findByRole("heading", { text: "Login" });
    expect(loginHeader).toBeInTheDocument();
  });

  it("perform successful login", async () => {
    render(<MockedLogin />);
    await performInputAction("kunal@google.com", "test@123");
    const addButton = await screen.findByRole("button", { text: /Add/i });
    expect(addButton).toBeInTheDocument();
  });

  it("perform unsuccessful login", async () => {
    render(<MockedLogin />);
    await performInputAction("kunal@google.com", "test@1234");
    const loginButton = await screen.findByRole("button", {text: /Login/i});
    expect(loginButton).toBeInTheDocument();
    const errorMessage = await screen.findByTestId("error");
    expect(errorMessage).toBeVisible();
  });
});