/**
 * Next.js Dependencies
*/
import { ImageResponse } from 'next/og';
import { NextApiRequest } from 'next';

export const config = {
    runtime: 'edge',
}

async function handler(req: NextApiRequest): Promise<ImageResponse> {
    const { searchParams } = new URL(req.url || '');
    const title = searchParams.get('title') || 'Mario Aguiar';
    const description = searchParams.get('description') || 'Frontend developer';

    return new ImageResponse(
        (
            <div style={{
                backgroundColor: 'rgb(24 24 27/1)',
                display: 'flex',
                gap: 16,
                fontFamily: 'Arial,system-ui',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 800,
                    height: 630,
                    color: 'white',
                    textAlign: 'center',
                }}>
                    <h1 style={{
                        fontWeight: 'bold',
                    }}>
                        {title}
                    </h1>

                    <p>
                        {description}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img width={400} height={400} src="http://localhost:3000/mariobw-og.jpg" alt="Mario Aguiar" />
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

export default handler;
