import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      by: 'sitotes 2025',
      instagram: '@m.saiful.anam.r',
    })
  );
  return { props: {} };
};

export default function Index() {
  return null;
}