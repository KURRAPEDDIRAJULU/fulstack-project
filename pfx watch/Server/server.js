const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors =require("cors");
const { Videos, VideosDetails } = require("./models/videos");
const { subscribe } = require("./routes/authRouters");
 const {PerfexUsersData} = require("./models/perfexUsers")


const port = 4445|| process.env.PORT
const addVideos = async () => {
    try {
        const videoDetail = new VideosDetails({


            title: "Complete React course with projects",
            video_url: "https://youtu.be/FxgM9k1rg0Q",
                  thumbnail_url: "https://i.ytimg.com/vi/FxgM9k1rg0Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCHe0cG35RVDrLQ_gChm9LB7a1wBA",
                  channel: [{
                    name: "Chai aur Code",
                    profile_image_url: "https://yt3.googleusercontent.com/1FEdfq3XpKE9UrkT4eOc5wLF2Bz-42sskTi0RkK4nPh4WqCbVmmrDZ5SVEV3WyvPdkfR8sw2=s176-c-k-c0x00ffffff-no-rj",
            subscriber_count: "103k"
                }],
               category:"Trending",   
               view_count: "227K ",
                  published_at: "Aug4,2023",
             description: "Understand the react flow and structure"
            
           
           
});

        const savedVideoDetail = await videoDetail.save();

        const video = new Videos({
            _id: savedVideoDetail._id,

          
  
        

            title: "Complete React course with projects",
            thumbnail_url: "https://i.ytimg.com/vi/FxgM9k1rg0Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCHe0cG35RVDrLQ_gChm9LB7a1wBA",
            channel: [{
              name: "Chai aur Code",
              profile_image_url: "https://yt3.googleusercontent.com/1FEdfq3XpKE9UrkT4eOc5wLF2Bz-42sskTi0RkK4nPh4WqCbVmmrDZ5SVEV3WyvPdkfR8sw2=s176-c-k-c0x00ffffff-no-rj"
            }],
            category:"Trending", 
            view_count: "227K ",
            published_at: "Aug4,2023"     
 });

        await video.save();
        await mongoose.disconnect();
    } catch (e) {
        console.log(e);
    } 
};
 
 //addVideos();



app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://rajukurra519:Raju1234@cluster0.ujttpwm.mongodb.net/pfxVedios?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.get("/", async(req,res)=>{
    res.send("server running at 4445")
})
app.use("/auth", require("./routes/authRouters"));
app.use("/videos", require("./routes/apiRoutes"));
// app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));