import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ReverseRouteProtector from "./ReverseRouteProtector";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

describe("Given a ReverseRouterProtector component", () => {
  describe("When it's intantiated and there is a user logged", () => {
    test("Then it should call navigate to cards", () => {
      const headingText = "Test";
      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "Paco" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });

      render(
        <Provider store={mockStore}>
          <ReverseRouteProtector>
            <h1>{headingText}</h1>
          </ReverseRouteProtector>
        </Provider>
      );

      expect(mockUseNavigate).toHaveBeenCalledWith("/cards");
    });

    test("Then it should render its children when the user is not logged", () => {
      const headingText = "Test";
      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "", id: "", token: "" },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer },
      });
      debugger;
      render(
        <Provider store={mockStore}>
          <ReverseRouteProtector>
            <h1>{headingText}</h1>
          </ReverseRouteProtector>
        </Provider>
      );
      const receivedText = screen.getByRole("heading", {
        name: headingText,
      });

      expect(receivedText).toBeInTheDocument();
    });
  });
});
