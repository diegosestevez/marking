const { json } = require('body-parser');
const Assignment = require('./../Models/assignmentModel');


//This function is a dependency for the userControllers.js createDefaultUsers() function 
exports.createAssignment = async (content) => {
try{
    const newAssignment = new Assignment(content)

    const savedAssigment = await newAssignment.save(newAssignment)
    console.log('Assignment has been created')
    console.log(savedAssigment)
  }catch(err){
      console.log(`${err} an error occured while the users were being created`)
  }   
} 

exports.getStudentAssignments = async (req, res) => {
        if(req.query.user){
            try{
                const assignmentData = await Assignment.find({user_id: req.query.user});

                if(assignmentData.length > 0){
                    res.send({
                        message:assignmentData
                        })
                }else{
                    res.send({
                        error:'No assignments found'
                    })
                }
        }catch(err){
            res.status(500).json({
                message: 'an error occured trying to retieve assignments',
                error: err
            })
        }
    }else{
        try{
            const assignmentData = await Assignment.find()
            res.status(200).json({
                message:'No URL query detected. Returning all assignments in Database',
                assignmentData: assignmentData
            })
        }catch(err){
            res.status(500).json({
                message: 'No URL query detected. An error has also occured trying to retieve assignments from the database'
            })
        }
    }  
}

exports.deleteAssignments = async (req, res) => {
    try{
    await Assignment.deleteMany({})
    res.status(204).json({
        message: 'All Assignments deleted'
    })
}catch(err){
    res.status(400).json({
        message: 'The Server is responding but the Database is not. Check database connection config in server.js'
    })
}
}


exports.postAssignment = async (req, res) => {
   try{
    await Assignment.findOneAndUpdate(
        {
            user_id: req.body.user_id, 
            type:req.body.type
        }, 
        {
            answer:req.body.answer, 
            submitted:req.body.submitted
        },
        {new:true})
   }catch(err){
    res.status(404).json({
        message:'document failed to update'
    })
   }
}


exports.markAssignment = async (req, res) => {
    try{
        console.log(req.body)
        await Assignment.findOneAndUpdate({_id:req.body.id},
            {
                score: req.body.score, 
                status: req.body.status
            }, 
            {new:true})
    }catch(err){
        res.status(404).json({
            message: 'document failed to update'
        })
    }
}