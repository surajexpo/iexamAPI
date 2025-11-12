const express = require('express');
const unspecifiedRoutesHandler = require('./unspecified.route');
const { finalErrorHandler } = require('../errorHandler');
const userRoute = require('./user.route.js');
const adminRoute = require('./admin.route.js');
const gkRoute=require('./gk.route.js');
const router = require('./auth.route.js');
const quizRoute = require('./quiz.route.js');
const caRoute = require('./currentaffairs.route.js');
const bannerRoute=require('./banner.route.js');

const appRoutes = (app) => {
  app.get('/api/ping', (_, res) =>
    res.status(200).json({ status: true, message: 'Ping Successfully.', timestamp: new Date() })
  );
  app.use('/public', express.static('public'));

  app.use('/users', userRoute);
  app.use('/admin', adminRoute);
  app.use('/banners',bannerRoute);
  app.use('/api', router);
  app.use('/gk',gkRoute);
  app.use('/quiz', quizRoute);
  app.use('/currentaffairs',caRoute);
  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;

