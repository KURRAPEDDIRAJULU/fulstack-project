const express = require("express");
const { Videos, VideosDetails } = require("../models/videos");
const jwtAuth = require("../middleware/jwtAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router(); // to handle the routes in node js



router.get("/", jwtAuth, async (req, res) => {
    const allVideos = await Videos.find({});
    res.json({ Videos: allVideos });
});

router.get("/all", jwtAuth, async (req, res) => {
    try {
        const { search } = req.query;
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const filterVideos = await Videos.find(query);
        if (filterVideos.length === 0) {
            return res.status(404).json({ message: "no Videos found" });
        }
        return res.json(filterVideos);
    } catch (e) {
        console.log(e);
        return res.json({ message: "internal server error" });
    }
});

router.get("/:category", jwtAuth, async (req, res) => {
    const { category } = req.params;

    const videosInCategory = await VideosDetails.find({ category: category });

    if (!videosInCategory || videosInCategory.length === 0) {
        return res.json({ message: "No videos found in the specified category" });
    }

    res.status(200).json({ videosInCategory: videosInCategory });
    console.log(category);
});

router.get("/videosby-Id/:id", jwtAuth, async (req, res) => {
    const { id } = req.params;
    const video = await VideosDetails.findOne({ _id: id });
    if (!video) {
        return res.json({ message: "video not found" });
    }

    

    res.status(200).json({ videoDetails: video });
    console.log(video );
});






module.exports = router;



















// const express = require("express");
// const { Videos, VideosDetails } = require("../models/videos");
// // const { JsonWebTokenError } = require("jsonwebtoken");
// const jwtAuth = require("../middleware/jwtAuth");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const router = express.Router(); // to handle the routes in node js


// router.get("/", jwtAuth, async (req, res) => {
//     const allVideos = await Videos.find({});
//     res.json({ Videos: allVideos });
// });

// router.get("/all", jwtAuth, async (req, res) => {
//     try {
//         const { search } = req.query;
//         const query = {};

//         if (search) {
//             query.title = { $regex: search, $options: "i" };
//         }

//         const filterVideos = await Videos.find(query);
//         if (filterVideos.length === 0) {
//             return res.status(404).json({ message: "no Videos found" });
//         }
//         return res.json(filterVideos);
//     } catch (e) {
//         console.log(e);
//         return res.json({ message: "internal server error" });
//     }
// });

// router.get("/:category", jwtAuth, async (req, res) => {
//     const { category } = req.params;
//     const videosInCategory = await VideosDetails.find({ category: category });

//     if (!videosInCategory || videosInCategory.length === 0) {
//         return res.json({ message: "No videos found in the specified category" });
//     }

//     res.status(200).json({ videosInCategory: videosInCategory });
// });

// router.get("/:id", jwtAuth, async (req, res) => {
//     const { id } = req.params;
//     const video = await VideosDetails.findOne({ _id: id });
//     if (!video) {
//         return res.json({ message: "video not found" });
//     }

//     // const videoTitle = video.title

//     // const Videos = await Videos.find({
//     //     title: { $regex: videoTitle, $options: 'i' },
//     //     _id: { $ne: id }
//     // })

//     res.status(200).json({ videoDetails: video });
//     // res.status(200).json({ videoDetails: video, similarVideos: similarVideos })
// });

// module.exports = router;
