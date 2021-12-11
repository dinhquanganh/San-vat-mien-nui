/* eslint-disable indent */
const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { roleRights } = require('../../config/roles');

const verifyCallback =
  (req, res, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      res.redirect('/admin/login');
      return;
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    req.headers.authorization = `Bearer ${req.cookies.accessToken}`;

    new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, res, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
