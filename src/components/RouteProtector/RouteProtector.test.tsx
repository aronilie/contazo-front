import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import RouteProtector from "./RouteProtector";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Given RouteProtector component", () => {
  describe("When it's intantiated without a logged user", () => {
    test("Then it should call navigate to login", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { UserName: "", id: "", token: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <RouteProtector>
            <h1>Sign in</h1>
          </RouteProtector>
        </Provider>
      );

      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    });

    test("Then it should render its children when the user is logged", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "paco" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <RouteProtector>
            <h1>Sign in</h1>
          </RouteProtector>
        </Provider>
      );

      const receivedText = screen.getByRole("heading", {
        name: "Sign in",
      });

      expect(receivedText).toBeInTheDocument();
    });
  });
});
