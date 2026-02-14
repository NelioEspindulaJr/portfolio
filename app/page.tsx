import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main id="site-sections" className="flex w-full flex-col">
      <section className="block w-full mix-blend-difference">
        <header className="flex w-full items-center justify-between p-4">
          <h1 className="text-lg font-extralight">Nélio Espíndula Junior</h1>
          <ModeToggle />
        </header>
      </section>
      <section className="flex w-full min-h-[200px] flex-col items-center justify-between px-4 py-16 md:px-16 md:py-32"></section>
    </main>
  );
}
