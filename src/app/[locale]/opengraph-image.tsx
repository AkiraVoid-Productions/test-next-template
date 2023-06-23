import { ImageResponse } from 'next/server';

import OpenGraphImage from '@/types/OpenGraphImage';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'OpenGraph Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const Image: OpenGraphImage = ({ params }) => {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        OpenGraph Image
      </div>
    ),
    { ...size }
  );
};

export default Image;
