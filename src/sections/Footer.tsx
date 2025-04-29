import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiArrowRight } from 'react-icons/fi';
import userData from '../data/userData';

const Footer: React.FC = () => {

  const socialLinks = [
    { href: userData.footer.socialLinks[0].href, icon: <FiLinkedin size={20} />, label: "LinkedIn" },
    { href: userData.footer.socialLinks[1].href, icon: <FiGithub size={20} />, label: "GitHub" },
    { href: userData.footer.socialLinks[2].href, icon: <FiTwitter size={20} />, label: "Twitter" },
    { href: userData.footer.socialLinks[3].href, icon: <FiInstagram size={20} />, label: "Instagram" },
    { href: userData.footer.socialLinks[4].href, icon: <FiMail size={20} />, label: "Email" }
  ];
  const location: any = {
    address: "Some Street Name",
    city: "Bhubaneswar",
    country: "India",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.58457775935!2d85.75041503952645!3d20.30071931323742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1908e0596ab70f%3A0xdaedf8e9f23836c3!2sBhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sin!4v1689873453364!5m2!1sen!2sin"
  }

  const quickLinks = userData.footer.quickLinks.map(link => ({
    label: link.label,
    href: `#${link.label.toLowerCase()}`
  }));

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-500 rounded-full"></div>
        <div className="absolute -bottom-20 right-20 w-40 h-40 bg-pink-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">

          {/* About Section */}
          <div className="w-full md:w-1/3 space-y-4">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">{userData.footer.title}</h3>
            <p className="text-gray-300 leading-relaxed">{userData.footer.description}</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 flex items-center"
                  >
                    <FiArrowRight className="mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-2/5">
            <div className="bg-card rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 h-72 shadow-lg">
              <iframe
                src={location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p className="hover:text-white transition-colors duration-300">
            {userData.footer.copyright}
          </p>
        </div>
      </div>


    </footer>
  );
};

export default Footer;