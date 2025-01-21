import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Disables certificate verification
    },
  });

  const mailOptions = {
    from: email,
    to: "business@aleksandarprod.com",
    subject: subject,
    text: `From: ${name} <${email}>\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email: ", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
