const mongoose = require("mongoose");

 const {schema} = mongoose;

//   const skillsSchema = new mongoose.Schema({
//     name : String,
//     imageUrl : String
//   })

//   const lifeAtCompanySchema = new mongoose.Schema({
//     description : String,
//     imageUrl : String
//   })

//   const jobsSchema = new mongoose.Schema({
//     title: String,
//     companyLogoUrl: String,
//     rating: Number,
//     location:String,
//     employmentType:String,
//     packagePerAnnum:String,
//     jobDescription:String

//   });

//   const Jobs = mongoose.model("jobs", jobsSchema);
//    const jobDetails = new mongoose.Schema({
//     title: String,
//     companyLogoUrl: String,
//     companyWebsiteUrl:String,
//     rating: Number,
//     location:String,
//     employmentType:String,
//     packagePerAnnum:String,
//     jobDescription:String,
//     skills:[skillsSchema],
//     lifeAtCompany: lifeAtCompanySchema

//    });

//    const JobDetails = mongoose.model("JobDetails", jobDetails);

//    module.exports = {JobDetails, Jobs};

const channelSchema = new mongoose.Schema({
          name : String,
          profile_image_url : String
       })

const channelSchema2 = new mongoose.Schema({
              name : String,
              profile_image_url : String,
              subscriber_count : String,
            })

       const videosSchema = new mongoose.Schema({
             title: String,
             category:String,
             thumbnail_url: String,
             channel:[channelSchema],
             view_count:String,
             published_at:String,
            
        
           });

           const Videos = mongoose.model("videos", videosSchema);


           const videoDetails = new mongoose.Schema({
                title: String,
                category:String,
                video_url: String,
                thumbnail_url:String,
                 channel:[channelSchema2],
                 view_count:String,
                 published_at:String,
                 description:String
            
                });

                const VideosDetails = mongoose.model("VideosDetails", videoDetails);

                module.exports = {VideosDetails, Videos};