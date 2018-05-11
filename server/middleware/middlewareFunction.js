const errorStatus = (statusCode, errorMessage, res) => {
  console.log('i got here too1')
  
  return res.status(statusCode).send({ error: errorMessage });
};

const checkField = (requestBody, requestAttribute, res) => {
  const undefinedOrEmpty = '' || undefined;
  if (requestBody === undefinedOrEmpty) {
    console.log('i got here2')
    return errorStatus(400, `${requestAttribute} is required`, res);
  } else if (requestBody.length < 5) {
    console.log(requestBody, 'i got here too3');
    
    return errorStatus(400, `${requestAttribute} is too short`, res);
  }
};



export default { errorStatus, checkField };
