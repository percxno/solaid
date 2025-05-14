import Image from 'next/image';

export default function Home() {
  return (
    <main className="main-container container">
      <section className="flex mt-32 gap-16 justify-between">
        <h1 className="text-7xl w-1/2 whitespace-nowrap">
          Emergency funds.
          <br />
          Instantly.
          <br /> On Solana.
        </h1>
        <p className="mt-10 font-light text-white/80 w-1/3">
          <span className="underline cursor-pointer text-primary">
            solaid.fund
          </span>{' '}
          helps you raise funds in minutes — powered by the speed and
          transparency of the Solana blockchain. Perfect for personal crises,
          medical bills, community needs, and more.
        </p>
      </section>
    </main>
  );
}
