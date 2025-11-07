import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    passwordHash : {
        type: String,
        required:true
    },
    age:{type:Number},
    gender:{type:String,
        enum:['male','female','other']
    },
    height: {type:Number},
    weight:{type:Number},
    activityLevel:{
        type:String,
        enum:['sedentary','light','moderate','active']
    },
    goals:{
        tdee: {type:Number},
        protein:{type:Number},
        fat:{type:Number},
        carbs:{type:Number}
    }
},{
    timestamps:true
}
);
const User = mongoose.model('User',userSchema);
export default User;