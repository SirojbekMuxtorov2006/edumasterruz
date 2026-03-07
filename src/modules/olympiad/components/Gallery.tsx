import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Camera, ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock Data (Real app, titles might come from DB or also be keys)
const galleryItems = [
  {
    id: 1,
    category: "Competition",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Regional Finals 2023",
    date: "March 15, 2023",
  },
  {
    id: 2,
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Gold Medal Ceremony",
    date: "May 20, 2023",
  },
  {
    id: 3,
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Teacher Training Seminar",
    date: "January 10, 2024",
  },
  {
    id: 4,
    category: "Competition",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Student Focus",
    date: "March 15, 2023",
  },
  {
    id: 5,
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Volunteers Meeting",
    date: "December 5, 2023",
  },
  {
    id: 6,
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1606326608606-d50d525ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Top School Award",
    date: "May 20, 2023",
  },
  {
    id: 7,
    category: "Competition",
    image:
      "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Math League Round 1",
    date: "February 12, 2024",
  },
  {
    id: 8,
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Strategy Session",
    date: "April 05, 2023",
  },
];

const categories = ["All", "Competition", "Awards", "Workshops", "Community"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useTranslation();

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-6 backdrop-blur-sm">
              <Camera className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("gallery.title")}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                      : "border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600"
                  }`}
                >
                  {t(`gallery.cat_${category.toLowerCase()}`)}
                </Button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] cursor-pointer animate-fade-in-up"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded mb-2">
                        {t(`gallery.cat_${item.category.toLowerCase()}`)}
                      </span>
                      <h3 className="text-white font-bold text-xl mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{item.date}</p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p>{t("gallery.empty")}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
