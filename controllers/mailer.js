const nodemailer = require('nodemailer');
const mailSender = async (email, title, body) => {
    console.log(email,title,body)
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
    service:"gmail",
    port:465,//true for 465, false for other ports
    // secure:true,
    logger:true,
    debug:true,
    // secureConnection:false,
      auth: {
        // type : "OAuth2",
        user: 'treasureddammie@gmail.com',
        pass: 'zujnrbkdvkeiugga',
      },
      this: {
        rejectUnAuthorized:true
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'treasureddammie@gmail.com',
      to: email,
      subject: title,
      text: body,
    });
    console.log(email,title,body)
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;