module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create your generators here
  plop.setGenerator("workspace", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Generate files",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/server/src/models/{{name}}.model.ts",
        templateFile: "plop/templates/model.template.hbs",
      },
      {
        type: "add",
        path: "packages/server/src/controllers/{{name}}.controller.ts",
        templateFile: "plop/templates/controller.template.hbs",
      },
      {
        type: "add",
        path: "packages/server/src/routes/{{name}}.routes.ts",
        templateFile: "plop/templates/route.template.hbs",
      },
      {
        type: "add",
        path: "packages/server/src/middlewares/{{name}}.ts",
        templateFile: "plop/templates/middleware.template.hbs",
      },
    ],
  });
};
