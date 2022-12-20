module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom",
      handler: "ingredient.customAction",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/custom-2",
      handler: "ingredient.customActionTwo",
      config: {
        auth: false,
      },
    },
  ],
};
