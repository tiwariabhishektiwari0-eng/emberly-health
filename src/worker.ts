// Cloudflare Worker entrypoint for Workers with Static Assets
// Routes POST /api/contact to the handler, and delegates all other requests to env.ASSETS

interface Env {
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  fullName: string;
  workEmail: string;
  phone?: string;
  practiceName: string;
  specialty: string;
  claimVolume: string;
  message: string;
  turnstileToken?: string;
  website_honeypot?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const data: Partial<ContactPayload> = await request.json();

    // 1. Honeypot check
    if (data.website_honeypot && data.website_honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Assessment request received.' }),
        { status: 200, headers }
      );
    }

    // 2. Validate required fields
    const fullName = (data.fullName || '').trim();
    const workEmail = (data.workEmail || '').trim();
    const practiceName = (data.practiceName || '').trim();
    const specialty = (data.specialty || '').trim();
    const claimVolume = (data.claimVolume || '').trim();
    const message = (data.message || '').trim();
    const phone = (data.phone || '').trim();
    const turnstileToken = (data.turnstileToken || '').trim();

    if (!fullName || !workEmail || !practiceName || !specialty || !claimVolume) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please fill in all required fields (Name, Work Email, Practice Name, Specialty, Claim Volume).'
        }),
        { status: 400, headers }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid work email address.' }),
        { status: 400, headers }
      );
    }

    if (fullName.length > 100 || practiceName.length > 150 || message.length > 3000 || phone.length > 30) {
      return new Response(
        JSON.stringify({ success: false, error: 'Input exceeded maximum character length.' }),
        { status: 400, headers }
      );
    }

    // 3. Verify Turnstile if secret key is present
    if (env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ success: false, error: 'Security verification failed. Please refresh and try again.' }),
          { status: 403, headers }
        );
      }

      const clientIp = request.headers.get('CF-Connecting-IP') || '';
      const turnstileFormData = new FormData();
      turnstileFormData.append('secret', env.TURNSTILE_SECRET_KEY);
      turnstileFormData.append('response', turnstileToken);
      if (clientIp) {
        turnstileFormData.append('remoteip', clientIp);
      }

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: turnstileFormData,
      });

      const verifyResult: { success?: boolean; 'error-codes'?: string[] } = await verifyRes.json();
      if (!verifyResult.success) {
        return new Response(
          JSON.stringify({ success: false, error: 'Turnstile verification did not pass. Please retry.' }),
          { status: 403, headers }
        );
      }
    }

    // 4. Send email via Resend if API key is present
    const recipientEmail = env.CONTACT_TO_EMAIL || 'hello@emberlyhealth.com';
    const senderEmail = env.CONTACT_FROM_EMAIL || 'Emberly Health Inquiries <onboarding@resend.dev>';

    if (env.RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #3F4650; max-width: 600px; line-height: 1.6; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
          <div style="border-bottom: 2px solid #F26B1D; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #F26B1D; margin: 0; font-size: 20px;">New Free Revenue Assessment Request</h2>
            <p style="color: #6B7280; margin: 4px 0 0 0; font-size: 14px;">Submitted via Emberly Health marketing website</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;"><strong>Full Name:</strong></td><td style="padding: 8px 0;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Work Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(workEmail)}" style="color: #F26B1D;">${escapeHtml(workEmail)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${escapeHtml(phone || 'Not provided')}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Practice Name:</strong></td><td style="padding: 8px 0;">${escapeHtml(practiceName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Specialty:</strong></td><td style="padding: 8px 0;">${escapeHtml(specialty)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B7280;"><strong>Monthly Claims:</strong></td><td style="padding: 8px 0;">${escapeHtml(claimVolume)}</td></tr>
          </table>
          ${message ? `
            <div style="margin-top: 20px; padding: 16px; background-color: #FAF7F4; border-radius: 6px;">
              <strong style="color: #3F4650; display: block; margin-bottom: 8px;">Message / Practice Notes:</strong>
              <p style="margin: 0; white-space: pre-wrap; color: #3F4650;">${escapeHtml(message)}</p>
            </div>
          ` : ''}
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
            <em>Notice: Emberly Health strictly prohibits submitting protected health information (PHI) via web forms.</em>
          </div>
        </div>
      `;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: workEmail,
          subject: `[New Assessment Request] ${practiceName} (${specialty})`,
          html: emailHtml,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error('Resend API dispatch error:', errorText);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Email delivery encountered an issue. Please contact hello@emberlyhealth.com directly.',
            fallbackMailto: `mailto:${recipientEmail}?subject=${encodeURIComponent('Assessment Request: ' + practiceName)}&body=${encodeURIComponent('Name: ' + fullName + '\nPractice: ' + practiceName + '\nSpecialty: ' + specialty + '\nMonthly Claims: ' + claimVolume + '\nPhone: ' + phone + '\nMessage: ' + message)}`
          }),
          { status: 502, headers }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you. Your assessment request has been received. Daniela Reyes or our practice team will contact you within 1 business day.'
      }),
      { status: 200, headers }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    console.error('Contact handler exception:', errorMsg);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred. Please reach out to hello@emberlyhealth.com.' }),
      { status: 500, headers }
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Dynamic API route
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    // Static assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
