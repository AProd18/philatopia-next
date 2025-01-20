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
      rejectUnauthorized: false, // Onemogućava verifikaciju sertifikata
    },
  });

  const mailOptions = {
    from: email, // Email korisnika
    to: "business@aleksandarprod.com", // Tvoj email na koji šalješ poruku
    subject: subject, // Naslov poruke
    text: `From: ${name} <${email}>\n\nMessage: ${message}`, // Telo poruke
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
