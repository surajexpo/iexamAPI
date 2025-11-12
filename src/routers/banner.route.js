const bannerRoute=require('express').Router();
const { addBanner } = require('../controllers/bannerController');
const {deleteBanner}=require('../controllers/bannerController');
const {getAllBanners}=require('../controllers/bannerController');
const {updateBanner}=require('../controllers/bannerController');
const { authenticateUser, fileUploader } = require('../middlewares');
// Add a new banner
bannerRoute.post('/addbanner', fileUploader([{ name: "image", maxCount: 1 }], "Banner"), addBanner);
bannerRoute.delete('/deletebanner/:id', deleteBanner);
bannerRoute.get('/getallbanners', getAllBanners);
bannerRoute.put('/updatebanner/:id', fileUploader([{ name: "image", maxCount: 1 }], "Banner"), updateBanner);
module.exports=bannerRoute;