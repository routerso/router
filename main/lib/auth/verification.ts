import { resend } from "@/lib/utils/resend";
import MagicLinkEmail from "@/components/email/magic-link-email";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: string;
  theme: string;
}) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: "info@outr.cloud",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send the verification email.");
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
