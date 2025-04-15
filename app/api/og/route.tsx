import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const page = searchParams.get('page') || 'home';

    // Try to load the font, or use a system font if it fails
    let interSemiBold;
    try {
      interSemiBold = await fetch(
        new URL('/public/fonts/Inter-SemiBold.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer());
    } catch (e) {
      console.error('Failed to load font:', e);
      // We'll fall back to a system font
    }

    // Generate greeting based on locale
    const greeting = locale === 'de' ? 'Willkommen' :
      locale === 'fr' ? 'Bienvenue' :
        locale === 'it' ? 'Benvenuto' : 'Welcome';

    // Set page-specific content
    const title = page === 'projects' ? 'Projects' : 'Portfolio';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f6f6f6',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '40px 80px',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="#333"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                fill="#333"
              />
            </svg>

            <p
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginTop: 20,
                marginBottom: 10,
                color: '#333',
              }}
            >
              Dan Nistor
            </p>

            <p
              style={{
                fontSize: 32,
                fontFamily: 'Inter, system-ui, sans-serif',
                marginBottom: 20,
                color: '#666',
              }}
            >
              {greeting} | {title}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: interSemiBold ? [
          {
            name: 'Inter',
            data: interSemiBold,
            style: 'normal',
            weight: 600,
          },
        ] : undefined,
      },
    );
  } catch (e) {
    console.error('Failed to generate OG image:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 