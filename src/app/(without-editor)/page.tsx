import Image from 'next/image';

export default function Home() {
  return (
    <section className="flex items-center flex-col mt-4">
      <h3>Share Code with developers</h3>
      <h6 className="mt-2">An Online editor to save and share code snippets</h6>
      <Image
        src="/Factorial.png"
        alt="Code Snippets Logo"
        className="mt-6"
        width={700}
        height={394}
        priority
        draggable={false}
        style={{
          height: 'auto',
          width: 'auto',
        }}
      />
    </section>
  );
}
