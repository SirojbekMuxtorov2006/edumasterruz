import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Target, Globe, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title")}
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600 font-medium">
                  <Target className="w-4 h-4 mr-2" /> {t("about.mission_badge")}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t("about.mission_title")}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t("about.mission_text_1")}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t("about.mission_text_2")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-6 rounded-2xl text-center">
                  <Globe className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("about.card_global_title")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("about.card_global_desc")}
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl text-center">
                  <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("about.card_community_title")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("about.card_community_desc")}
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl text-center">
                  <Award className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("about.card_excellence_title")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("about.card_excellence_desc")}
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl text-center">
                  <Target className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("about.card_growth_title")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("about.card_growth_desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team / Stats */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  10k+
                </div>
                <div className="text-gray-600">
                  {t("about.stat_participants")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">{t("about.stat_schools")}</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  12
                </div>
                <div className="text-gray-600">{t("about.stat_regions")}</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  5
                </div>
                <div className="text-gray-600">{t("about.stat_years")}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
