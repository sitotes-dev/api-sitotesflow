// pages/img.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ImagePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {id && <img src={`https://drive.google.com/uc?export=download&id=${id}`} alt="Gambar" />}
    </div>
  );
}