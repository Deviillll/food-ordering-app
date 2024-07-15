import nodemailer from "nodemailer";


const sendEmail = async (email,id) => {

try {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "hammadtariq7777@gmail.com",
          pass: "zqjbgurdlhmonshq"
        }
      });
    
      const mailOptions ={
        from: 'hammadtariq7777@gmail.com', // sender address
        to: email, // list of receivers
        subject: "verify your email", // Subject line
        html: `<h1>please verify your email</h1>
        <p>if you could not find email then check spam folder</p>
         <a href="${process.env.Domain}/verify/${id}">click here</a>
               
        `, // html body
    }
    const result= await transporter.sendMail(mailOptions);
    console.log(result)
    
    return result;
    
    
    
} catch (error) {
    console.log(error + "  error in sending email")
    
}
}
export default sendEmail;
