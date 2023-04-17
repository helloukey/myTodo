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

describe("check login page", () => {
  it("check login header", async () => {
    render(<MockedLogin />);
    const loginHeader = await screen.findByRole("heading", { text: "Login" });
    expect(loginHeader).toBeInTheDocument();
  });

  it("perform successful login", async () => {
    render(<MockedLogin />);
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, {target: {value: "kunal@google.com"}});
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, {target: {value: "test@123"}});
    const loginButton = screen.getByRole("button", {text: /Login/i});
    fireEvent.click(loginButton);
    const loadingButton = await screen.findByRole("button", {text: /Loading/i});
    expect(loadingButton).toBeInTheDocument();
    const addButton = await screen.findByRole("button", {text: /Add/i});
    expect(addButton).toBeInTheDocument();
  });
});
