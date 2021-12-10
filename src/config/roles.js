const allRoles = {
  user: ["getDashboard"],
  admin: ["getUsers", "manageUsers", "getDashboard"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
