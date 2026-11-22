import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>ChangeFlow Cockpit</h1>
      <p>Change pipeline dashboard (synthetic data).</p>
      <Link href="/health">Check system health</Link>
    </main>
  );
}
