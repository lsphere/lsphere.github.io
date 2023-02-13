const data = {
  userInformation: null,
  userAssignments: null,
  userQuizzes: null,
  userIQTests: [],
  userHRInterviewQuestions: [],
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case "SET_USER_INFORMATION":
      return {
        ...state,
        userInformation: action.userInformation,
      };
    case "SET_USER_ASSIGNMENTS":
      return {
        ...state,
        userAssignments: action.userAssignments,
      };
    case "SET_USER_QUIZZES":
      return {
        ...state,
        userQuizzes: action.userQuizzes,
      };
    case "SET_USER_IQ_TESTS":
      return {
        ...state,
        userIQTests: action.userIQTests,
      };
    case "SET_USER_HR_INTERVIEW_QUESTIONS":
      return {
        ...state,
        userHRInterviewQuestions: action.userHRInterviewQuestions,
      };
    default:
      return state;
  }
};
export default reducer;
