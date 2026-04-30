export const appConfig: {
  models: Record<string, Record<string, string>>;
} = {
  models: {
    tasks: {
      title: "string",
      description: "string",
      completed: "boolean"
    },
    users: {
      name: "string",
      email: "string"
    }
  }
};
