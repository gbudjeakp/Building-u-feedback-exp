module.exports = (inputs) => {
    let errors = {};
    let linkPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // codeLink
    // topicOfLearningSession

    //Proper link validation procedure



    // topic of Learning 
  
    let validationCheck = !Object.keys(errors).length ? true : false;
  
    return {
      errors,
      validationCheck,
    };
  };
  