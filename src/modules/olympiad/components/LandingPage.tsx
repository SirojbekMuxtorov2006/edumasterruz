import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";
import {
  Trophy,
  Users,
  BookOpen,
  Clock,
  ArrowRight,
  Award,
  Globe,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const handleAction = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="bg-indigo-900 border-b mt-24 border-indigo-800 overflow-hidden relative z-40">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between">
          <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest whitespace-nowrap mr-8 flex items-center">
            <Globe className="w-3 h-3 mr-2 text-indigo-400" />
            {t("common.partner_countries")}
          </div>

          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex hover:pause-animation whitespace-nowrap">
              {/* Content duplicated for seamless loop */}

              <div className="flex items-center gap-8 mx-6">
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇺🇿</span> {t("common.uzbekistan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇰🇿</span> {t("common.kazakhstan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇰🇬</span> {t("common.kyrgyzstan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇹🇯</span> {t("common.tajikistan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇹🇲</span> {t("common.turkmenistan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇹🇷</span> {t("common.turkey")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇦🇿</span> {t("common.azerbaijan")}
                </span>
                <span className="flex items-center gap-2 text-indigo-300 font-medium text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🇬🇧</span>{" "}
                  {t("common.united_kingdom")}
                </span>
              </div>
            </div>
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-indigo-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-indigo-900 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-800 mb-6 shadow-sm animate-fade-in-up">
            <Award className="w-4 h-4 mr-2 text-indigo-600" />
            {t("landing.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
            {t("landing.title_start")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              {t("landing.title_highlight")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            {t("landing.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Button
              className="text-lg py-6 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform hover:-translate-y-1 transition-all"
              onClick={handleAction}
            >
              {isAuthenticated
                ? t("landing.cta_dashboard")
                : t("landing.cta_primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Decorative BG elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Info Cards */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("landing.features_title")}
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 transform transition-transform hover:scale-110 duration-300">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("landing.feature_1_title")}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {t("landing.feature_1_desc")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 transform transition-transform hover:scale-110 duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("landing.feature_2_title")}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {t("landing.feature_2_desc")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 transform transition-transform hover:scale-110 duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t("landing.feature_3_title")}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {t("landing.feature_3_desc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 opacity-80">
            {t("landing.partners_title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Partner Placeholders */}
            <div className="border border-gray-200 h-16 w-40 bg-white rounded-lg flex items-center justify-center text-gray-400 font-bold shadow-sm hover:shadow-md transition-all">
              Ministry Edu
            </div>
            <div className="border border-gray-200 h-16 w-40 bg-white rounded-lg flex items-center justify-center text-gray-400 font-bold shadow-sm hover:shadow-md transition-all">
              Cambridge
            </div>
            <div className="border border-gray-200 h-16 w-40 bg-white rounded-lg flex items-center justify-center text-gray-400 font-bold shadow-sm hover:shadow-md transition-all">
              Pearson
            </div>
            <div className="border border-gray-200 h-16 w-40 bg-white rounded-lg flex items-center justify-center text-gray-400 font-bold shadow-sm hover:shadow-md transition-all">
              IELTS Zone
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
