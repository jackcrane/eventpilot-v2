import { sendEmail } from "#postmark";
import WelcomeEmail from "#emails/forgot-password.jsx";
import { render } from "@react-email/render";

const html = await render(WelcomeEmail.WelcomeEmail({ name: "Jack Crane" }));

console.log(html);
