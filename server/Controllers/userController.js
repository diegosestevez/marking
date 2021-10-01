const User = require('./../Models/userModel');
const assignment = require('./../Controllers/assignmentController');

let userObj = [
    {
        name: 'Joe Schmoe',
    },
    {
        name: 'Karl Gustav',
        usertype: 'Student',
    },
    {
        name: 'Katie Clues',
        usertype: 'Student',
    },
    {
        name: 'Mike Naegi',
        usertype: 'Student',
    }
]

let assignObj = [
    {
        title: "When Was BCIT's 50th-annniversary celebration?",
        type:'MC',
        options: ["2016", "1976", "2002", "1999"],
        submitted: false,
        score: 0,
        answer: ''
    },
    {
        title: "Which of the following services does the LTC provide? Select all that apply.",
        type: 'MS',
        options: ['Technical Illustration', 'Instructional Design', 'Financial Advice', 'Admission and Registration', 'Audio-visual Loans'],
        submitted: false,
        score: 0,
        answer: ''
    },
    {
        title: "The current Prime Minister in Canada is (include the starting year for the PM)?",
        type: 'FIB',
        options: [],
        submitted: false,
        score: 0,
        answer: ''
    },
];


exports.createDefaultUsers = async () =>{
    try{
        const users = await User.find();

        if(users.length < 4){
            userObj.forEach((i)=>{
                const newUser = new User(i)
    
                newUser.save().then( data => {
                 console.log('new user created!')
                 console.log(data)
    
                 if(data.usertype === 'Student'){
                     assignObj.forEach((i)=>{
                        assignment.createAssignment({
                             user_id: data._id,
                             name: data.name,
                             title: i.title,
                             type: i.type,
                             options: i.options,
                             submitted: i.submitted,
                             score: i.score,
                             answer: i.answer
                       })
                   })
                 }
                }).catch(err =>{
                    throw new Error(`${err} assignments were not created`);
                })       
            })
        }
    }catch(err){
        res.status(404).json({
            message:'assignments were not created',
            error: err
        })
    } 
}


exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: 'success',
            users
        })
    }catch(err){
        res.status(400).json({
            message:'failed',
            error: err
        })
    }
}


exports.deleteAllUsers = async (req, res) => {
    try{
        const users = await User.deleteMany({})
        res.status(204).json({})
    }catch(err){
        res.status(400).json({
            message: 'something went really wrong if you are seeing this',
            error: err
        })
    }
}


exports.authenticateUsers = async (req, res) => {
    try{
        const user = await User.findOne({name: req.query.user}).select('+password');
        const password = req.query.password;

        //Check if user exists
        if(!user){
            return res.status(404).json({
                message: 'This user does not exist',
            })
        }
       
        //Check if password matches
        if(!(await user.correctPassword(password, user.password))){
              return res.status(404).json({
                    message: 'This password is incorrect. Please try again.',
            })
        }    
        
        //If checks are cleared then login user
        res.status(200).json({
            message: 'Success',
            user
        })
        
    }catch(err){
        res.status(500).json({
            message: 'An error occuried while trying to retrieve users'
        })
    }
}