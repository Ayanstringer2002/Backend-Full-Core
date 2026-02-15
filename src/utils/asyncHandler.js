
// This is also a wrapper function code but with help of Promise we can also create it using try-catch as well.
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err));
    }
}
export {asyncHandler}



// This wrapper function that can be used everywhere
/*
const asyncHandler = (fn) => async (req,res, next) => {
    try{
      await fn(req,res,next)  
    } catch(error){
        res.status(error.code || 500).json({
            sucess: false,
            message: error.message
        })
    }
}
*/
