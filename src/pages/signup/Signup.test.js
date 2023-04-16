import { render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { AuthContextProvider } from "../../context/AuthContext";

describe("check signup screen", () => {
    it("check signup header", async () => {
    render(
      <AuthContextProvider>
        <Signup />
      </AuthContextProvider>
    );
    const signupHeader = await screen.findByRole("heading", {text: "Signup"});
    expect(signupHeader).toBeInTheDocument();
  });
});