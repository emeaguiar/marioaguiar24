/**
 * Next.js Dependencies
 */
import { ImageResponse } from 'next/og';
import { NextApiRequest } from 'next';

/**
 * Internal dependencies
 */
import { SITE_URL } from '@/lib/data';

export const config = {
  runtime: 'edge',
};

async function handler(req: NextApiRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url || '');
  const title = searchParams.get('title');

  const longCangRegular = await fetch( new URL('./fonts/LongCang-Regular.ttf', SITE_URL) )
    .then((res) => res.arrayBuffer());
  const ralewayBlack = await fetch( new URL('./fonts/Raleway-Black.ttf', SITE_URL) )
    .then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'rgb(24 24 27/1)',
          display: 'flex',
          gap: 16,
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        <div
          style={{  
            display: 'flex',
            flexDirection: 'column',
            fontSize: 36,
            alignItems: 'center',
            justifyContent: 'center',
            width: 800,
            height: 630,
            color: 'white',
            padding: 16,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontWeight: 600,
            }}
          >
            {
                title ? (
                    <span style={{
                        textTransform: 'uppercase',
                    }}>
                        {title}
                    </span>
                ) : (
                    <span style={{
                        fontFamily: 'Long Cang, cursive',
                        fontSize: '8rem',
                    }}>
                        Mario Aguiar.
                    </span>
                )
            }
          </h1>

          <p>
            {
                title ?
                    (
                        <span style={{
                            fontFamily: 'Long Cang, cursive',
                            fontSize: '5rem',
                        }}>
                            Mario Aguiar.
                        </span>
                    ) :
                    (
                        <>FRONT-END DEVELOPER</>
                    )
            }
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
          <img
            width={400}
            height={400}
            src={`${SITE_URL}/mariobw-og.jpg`}
            alt='Mario Aguiar'
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { data: longCangRegular, name: 'Long Cang', weight: 400 },
        { data: ralewayBlack, name: 'Raleway', weight: 900 },
      ]
    }
  );
}

export default handler;
