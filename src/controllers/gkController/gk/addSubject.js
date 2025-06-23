const GkSubject=require('../../../models/gkModels')
const addSubject = async(req,res)=>{
try{
    console.log('chala');
    const subject = new GkSubject({
        name: req.body.name,
        description: req.body.description || '',
        headings: [] 
      });
      
      await subject.save();
    return res.status(201).json({
        status: true,
        data:subject,
        message:"Subject created successfully",
    });
}catch(error){
    return res.status(500).json({
        status: false,
        message: error.message,
    });
}
}
module.exports=addSubject;