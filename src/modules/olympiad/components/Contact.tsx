import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="bg-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
            <p className="text-indigo-200 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("contact.form_title")}
                  </h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          {t("contact.label_firstname")}
                        </label>
                        <Input placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          {t("contact.label_lastname")}
                        </label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("contact.label_email")}
                      </label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("contact.label_subject")}
                      </label>
                      <Input placeholder={t("contact.label_subject")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("contact.label_message")}
                      </label>
                      <Textarea
                        placeholder={t("contact.label_message")}
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6">
                      <Send className="w-4 h-4 mr-2" /> {t("contact.btn_send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8 flex flex-col justify-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("contact.info_title")}
                  </h3>
                  <p className="text-gray-600 mb-8">{t("contact.info_text")}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {t("contact.info_email_title")}
                      </h4>
                      <p className="text-indigo-600 font-medium">
                        info@turonolympiad.uz
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("contact.info_email_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {t("contact.info_call_title")}
                      </h4>
                      <p className="text-indigo-600 font-medium">
                        +998 90 123 45 67
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("contact.info_call_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {t("contact.info_visit_title")}
                      </h4>
                      <p className="text-gray-600">
                        123 Education Avenue,
                        <br />
                        Yunusabad District,
                        <br />
                        Tashkent, Uzbekistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
