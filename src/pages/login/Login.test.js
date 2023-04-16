import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { AuthContextProvider } from "../../context/AuthContext";

describe("check login screen", () => {
    it("check login header", async () => {
    render(
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    );
    const loginHeader = await screen.findByRole("heading");
    expect(loginHeader).toBeInTheDocument();
  });
});
