import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  Twitter,
  Mail,
  GraduationCap,
  Award,
  Globe,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const BoardMembers = () => {
  const { t } = useTranslation();

  const members = [
    {
      name: t("board.member_1_name"),
      role: t("board.member_1_role"),
      institution: "National University of Uzbekistan",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_1_bio"),
      icon: <Award className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: t("board.member_2_name"),
      role: t("board.member_2_role"),
      institution: "Cambridge Assessment International",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_2_bio"),
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: t("board.member_3_name"),
      role: t("board.member_3_role"),
      institution: "Turon Olympiad Committee",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_3_bio"),
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: t("board.member_4_name"),
      role: t("board.member_4_role"),
      institution: "MIT (Alumni)",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_4_bio"),
      icon: <Award className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: t("board.member_5_name"),
      role: t("board.member_5_role"),
      institution: "Tech Innovations Lab",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_5_bio"),
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: t("board.member_6_name"),
      role: t("board.member_6_role"),
      institution: "Youth Union",
      image:
        "https://images.unsplash.com/photo-1598550832205-d07e46690165?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: t("board.member_6_bio"),
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-indigo-500 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 mb-6 backdrop-blur-sm">
              <Users className="w-4 h-4 mr-2" /> {t("board.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("board.title")}
            </h1>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("board.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-indigo-900/0 transition-all duration-300 z-10"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {member.icon}
                    </div>
                  </div>

                  <CardContent className="pt-6 pb-8 px-6 relative">
                    <div className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-sm font-medium text-gray-400 mb-4">
                      {member.institution}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-sky-500 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>

                  {/* Bottom highlight bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BoardMembers;
