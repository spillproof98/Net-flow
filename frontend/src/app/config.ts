export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",

  features: {
    auth: true,
    stacks: true,
    workflowBuilder: true,
    chat: true,
  },
};
