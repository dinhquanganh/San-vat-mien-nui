const allRoles = {
  user: ['getDashboard', 'getProduct'],
  admin: ['getUsers', 'manageUsers', 'getDashboard', 'getProduct'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
