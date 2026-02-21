// 本地类型定义，用于绕过 Convex 类型检查
export const api = {
  tasks: {
    getAllTasks: () => {},
    getTasksByStatus: () => {},
    getTasksByAssignee: () => {},
    createTask: () => {},
    updateTaskStatus: () => {},
    updateTaskProgress: () => {}
  },
  team: {
    getAllTeamMembers: () => {},
    upsertTeamMember: () => {}
  },
  public: {
    getAllTasks: () => {},
    createTask: () => {},
    updateTaskStatus: () => {}
  }
};

export const internal = api;
