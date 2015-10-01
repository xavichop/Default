var UserPost = require('../Models/userPost');
var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.route('/saveImage')
    .post(function (req, res) {

        var imgPath = req.body.path;//"C:/retoMovi/Pictures/movi.png"
        var userPost = new UserPost;
        userPost.img.data = fs.readFileSync(imgPath);
        userPost.img.contentType = 'image/png';
        userPost.save(function (err, id) {

            if (err) {
                return res.send(err);
            }

            res.send({message: 'Image Added'});
        });
    })

router.route('/getImage')
    .get(function (req, res) {

        UserPost.findById("560b8a128a0d4704053fea1f", function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.picture.contentType);
            res.send(doc.picture.data);
        });


    })
router.route('/userPosts')
    .get(function (req, res) {
        UserPost.find(function (err, userPosts) {
            if (err) {
                return res.send(err);
            }

            res.json(userPosts);
        });
    })



module.exports = router;
