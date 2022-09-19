import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.post(`${apiUrl}users/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        phoneNumber: "888555222",
        id: "6311947608ed28e35ccabbeb",
      })
    );
  }),

  rest.post(`${apiUrl}users/login`, async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzBkMDBjMTE1MDllNTE2N2JiN2Y1YmIiLCJpYXQiOjE2NjIwOTY0NzB9.tVQVAvCBc5CXN7-GQirdI67Q8Zuzae0EQmVBhPow11s",
        },
      })
    );
  }),

  rest.post(`${apiUrl}create`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("Contact successfully created"));
  }),

  rest.delete(`${apiUrl}delete/888555222`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json("Contact deleted successfully"));
  }),

  rest.post(`${apiUrl}update/888555222`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json("Contact updated successfully"));
  }),
];

export default handlers;
