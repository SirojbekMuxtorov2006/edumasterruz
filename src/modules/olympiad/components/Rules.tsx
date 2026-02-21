import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, AlertCircle, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const Rules = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{t("rules.title")}</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t("rules.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* General Rules */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-indigo-600" />{" "}
                {t("rules.section_general")}
              </h2>
              <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("rules.rule_eligibility_title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("rules.rule_eligibility_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("rules.rule_registration_title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("rules.rule_registration_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t("rules.rule_device_title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("rules.rule_device_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Format */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-indigo-600" />{" "}
                {t("rules.section_format")}
              </h2>
              <div className="bg-indigo-50 rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">
                      {t("rules.format_duration_title")}
                    </h4>
                    <p className="text-gray-700">
                      {t("rules.format_duration_val")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">
                      {t("rules.format_questions_title")}
                    </h4>
                    <p className="text-gray-700">
                      {t("rules.format_questions_val")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">
                      {t("rules.format_scoring_title")}
                    </h4>
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: t("rules.format_scoring_val"),
                      }}
                    ></p>
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">
                      {t("rules.format_results_title")}
                    </h4>
                    <p className="text-gray-700">
                      {t("rules.format_results_val")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disqualification */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-red-600" />{" "}
                {t("rules.section_disqualification")}
              </h2>
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <p className="text-red-800 mb-4">
                  {t("rules.disqualification_text")}
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>{t("rules.disq_1")}</li>
                  <li>{t("rules.disq_2")}</li>
                  <li>{t("rules.disq_3")}</li>
                  <li>{t("rules.disq_4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
