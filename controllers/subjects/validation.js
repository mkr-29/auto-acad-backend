const Joi = require("joi");

// validation schema for create subject
const createSubjectSchema = Joi.object({
  subjectName: Joi.string().required(),
  subjectCode: Joi.string().required(),
  subjectFaculty: Joi.string().required(),
  credits: Joi.number().required(),
  subjectType: Joi.string().required(),
  attendance: Joi.number().required(),
  noOfTests: Joi.number().required(),
  marks: Joi.array()
    .items(
      Joi.object({
        testNo: Joi.number().required(),
        score: Joi.number().allow(null)
        // score: Joi.alternatives().try(Joi.number(), Joi.valid(null)).required(),
      })
    )
    .required()
    .custom((marks, helpers) => {
      const { noOfTests } = helpers.state.ancestors[0];
      if (marks.length !== noOfTests) {
        return helpers.message("Number of tests should be equal to noOfTests");
      }
      return marks;
    }, "Marks array length validation"),
});

module.exports = {
  createSubjectSchema,
};
