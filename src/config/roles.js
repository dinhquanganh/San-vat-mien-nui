const allRoles = {
  user: [
    'getDashboard',
    'getProduct',
    'getOrder',
    'manageOrder',
    'manageProduct',
  ],
  admin: [
    'getUsers',
    'manageUsers',
    'getDashboard',
    'getProduct',
    'getOrder',
    'manageOrder',
    'manageProduct',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
