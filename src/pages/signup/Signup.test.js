import { fireEvent, render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { AuthContextProvider } from "../../context/AuthContext";

const MockedSignup = () => {
  return (
    <AuthContextProvider>
      <Signup />
    </AuthContextProvider>
  );
};

const performInputAction = async (name, email, password) => {
  const nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: name } });
  const emailInput = screen.getByTestId("email");
  fireEvent.change(emailInput, { target: { value: email } });
  const passwordInput = screen.getByTestId("password");
  fireEvent.change(passwordInput, { target: { value: password } });
  const singupButton = screen.getByRole("button", { text: /Signup/i });
  fireEvent.click(singupButton);
  const loadingButton = await screen.findByRole("button", {
    text: /Signing up.../i,
  });
  expect(loadingButton).toBeInTheDocument();
};

describe("check signup screen", () => {
  it("check signup header", async () => {
    render(<MockedSignup />);
    const signupHeader = await screen.findByRole("heading", { text: "Signup" });
    expect(signupHeader).toBeInTheDocument();
  });

  it("perform successful signup", async () => {
    render(<MockedSignup />);
    await performInputAction(
      "kunaltesting",
      "kunaltesting@google.com",
      "test@123"
    );
    const addButton = await screen.findByRole("button", { text: /Add/i });
    expect(addButton).toBeInTheDocument();
  });

  it("perform unsuccessful signup", async () => {
    render(<MockedSignup />);
    await performInputAction("kunal", "kunal@google.com", "test@1234");
    const singupButton = await screen.findByRole("button", { text: /Signup/i });
    expect(singupButton).toBeInTheDocument();
    const errorMessage = await screen.findByTestId("error");
    expect(errorMessage).toBeVisible();
  });
});
