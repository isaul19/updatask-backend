import type { Paths } from "swagger-jsdoc";

const BASE_PATH = "/api/project";

export const projectPath: Paths = {
  [BASE_PATH + "/"]: {
    get: {
      tags: ["Project"],
      summary: "List all projects",
      responses: {
        200: {
          description: "List all projects successfully",
        },
      },
    },

    post: {
      tags: ["Project"],
      summary: "Create project",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                projectName: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                clientName: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                description: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Create project successfully",
        },
      },
    },
  },

  [BASE_PATH + "/{projectId}"]: {
    get: {
      tags: ["Project"],
      summary: "Get project by id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Get project by id successfully",
        },
      },
    },

    put: {
      tags: ["Project"],
      summary: "Update project by id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                projectName: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                clientName: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                description: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Update project by id successfully",
        },
      },
    },

    delete: {
      tags: ["Project"],
      summary: "Delete project by id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Delete project by id successfully",
        },
      },
    },
  },

  [BASE_PATH + "/{projectId}/task"]: {
    // get: {
    //   tags: ["Project"],
    //   summary: "List all tasks by project id",
    //   parameters: [
    //     {
    //       name: "projectId",
    //       in: "path",
    //       required: true,
    //       schema: {
    //         type: "string",
    //       },
    //     },
    //   ],
    //   responses: {
    //     "200": {
    //       description: "List all tasks by project id successfully",
    //     },
    //   },
    // },

    post: {
      tags: ["Project"],
      summary: "Create task by project id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                description: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Create task by project id successfully",
        },
      },
    },
  },

  [BASE_PATH + "/{projectId}/task/{taskId}"]: {
    // get: {
    //   tags: ["Project"],
    //   summary: "Get task by id",
    //   parameters: [
    //     {
    //       name: "projectId",
    //       in: "path",
    //       required: true,
    //       schema: {
    //         type: "string",
    //       },
    //     },
    //     {
    //       name: "taskId",
    //       in: "path",
    //       required: true,
    //       schema: {
    //         type: "string",
    //       },
    //     },
    //   ],
    //   responses: {
    //     "200": {
    //       description: "Get task by id successfully",
    //     },
    //   },
    // },

    put: {
      tags: ["Project"],
      summary: "Update task by id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "taskId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
                description: {
                  type: "string",
                  minLength: 2,
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Delete task by id successfully",
        },
      },
    },

    delete: {
      tags: ["Project"],
      summary: "Delete task by id",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "taskId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Delete task by id successfully",
        },
      },
    },
  },
};
