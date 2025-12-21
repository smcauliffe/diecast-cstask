import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarBySlug, getAllCars } from "@/lib/contentstack";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cars = await getAllCars();
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export default async function CarPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <main className="max-w-[1200px] mx-auto py-12 px-8">
      <article className="max-w-[800px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 mb-8 text-sm hover:text-red-600"
        >
          ← Back to collection
        </Link>

        <div className="aspect-video bg-gray-200 dark:bg-neutral-700 rounded-lg mb-8 flex items-center justify-center text-gray-500 overflow-hidden">
          {car.main_image ? (
            <img
              src={car.main_image.url}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>No image</span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">{car.title}</h1>

        <div className="flex gap-4 mb-8 text-gray-500">
          <span className="inline-block bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
            {car.brand}
          </span>
          {car.year && <span>Year: {car.year}</span>}
        </div>

        <div
          className="text-lg leading-relaxed prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: car.description }}
        />
      </article>
    </main>
  );
}
