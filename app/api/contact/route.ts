import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod'; // Add zod to package.json for validation

// Initialize Resend (store API key in env variables)
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting setup
const RATE_LIMIT_DURATION = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 5;
const ipRequestMap = new Map<string, { count: number, timestamp: number }>();

// Validation schema
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0), // Should be empty for legitimate submissions
});

export async function POST(request: Request) {
  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Check rate limit
  const now = Date.now();
  const ipData = ipRequestMap.get(ip);

  if (ipData) {
    // Reset counter if time window has passed
    if (now - ipData.timestamp > RATE_LIMIT_DURATION) {
      ipRequestMap.set(ip, { count: 1, timestamp: now });
    } else if (ipData.count >= MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later' },
        { status: 429 }
      );
    } else {
      ipRequestMap.set(ip, { count: ipData.count + 1, timestamp: ipData.timestamp });
    }
  } else {
    ipRequestMap.set(ip, { count: 1, timestamp: now });
  }

  try {
    // Parse and validate input
    const body = await request.json();

    // Check for honeypot (spam protection)
    if (body.honeypot) {
      // Pretend success but don't send email
      return NextResponse.json({ success: true });
    }

    // Validate input
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Sanitize inputs (simple example - more robust sanitization may be needed)
    const sanitizedMessage = message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Send email
    await resend.emails.send({
      from: email,
      to: process.env.TO_EMAIL || 'your@email.com',
      subject: `New Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${sanitizedMessage}`,
      // Optional HTML version
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
} 