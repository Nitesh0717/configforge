export const appConfig = {
  models: {
    tasks: {
      title: "string",
      description: "string",
      completed: "boolean",
    },
  },

  ui: {
    pages: [
      {
        model: "tasks",
        title: "Tasks",
      },
    ],
  },
};
