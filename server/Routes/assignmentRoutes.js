const express = require('express');
const assignmentController = require('./../Controllers/assignmentController');

const router = express.Router();

router.route('/')
 .get(assignmentController.getStudentAssignments)
 .delete(assignmentController.deleteAssignments)

router.route('/submit')
 .patch(assignmentController.postAssignment)

router.route('/mark')
 .patch(assignmentController.markAssignment)

 module.exports = router;