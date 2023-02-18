module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create your generators here
  plop.setGenerator("workspace", {
    description: "create a new feature",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name ( posts ) ?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/server/src/features/{{name}}/{{name}}.model.js",
        templateFile: "plop/templates/model.template.hbs",
      },
      {
        type: "add",
        path: "packages/server/src/features/{{name}}/{{name}}.controller.js",
        templateFile: "plop/templates/controller.template.hbs",
      },
      {
        type: "add",
        path: "packages/server/src/features/{{name}}/{{name}}.routes.js",
        templateFile: "plop/templates/route.template.hbs",
      },
    ],
  });
};
