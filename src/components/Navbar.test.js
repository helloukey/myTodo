import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { AuthContextProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("check navbar heading", () => {
  it("check navbar heading available", async () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContextProvider>
    );
    const navbarHeading = await screen.findByRole("heading", {
      text: "myTodo",
    });
    expect(navbarHeading).toBeInTheDocument();
  });
});
