import Link from "next/link";
import { getAllCars } from "@/lib/contentstack";

export default async function Home() {
  const cars = await getAllCars();

  return (
    <main className="max-w-[1200px] mx-auto py-12 px-8">
      <h2 className="text-3xl font-bold mb-8">The Collection</h2>

      {cars.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No cars in the collection yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {cars.map((car) => (
            <Link
              href={`/cars/${car.slug}`}
              key={car.uid}
              className="bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500 text-sm">
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
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{car.title}</h3>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="inline-block bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                    {car.brand}
                  </span>
                  {car.year && <span>{car.year}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
