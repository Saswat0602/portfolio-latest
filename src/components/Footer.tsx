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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4 transform transition-all duration-500 hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-blue-400 mb-4 hover:text-blue-300 transition-colors duration-300">{userData.footer.title}</h3>
            <p className="text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
              {userData.footer.description}
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-blue-500/20"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform transition-all duration-500 hover:-translate-y-1">
            <h3 className="text-xl font-bold mb-4 relative inline-block group">
              Quick Links
              <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <FiArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-all duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform transition-all duration-500 hover:-translate-y-1">
            <h3 className="text-xl font-bold mb-4 relative inline-block group">
              Contact Info
              <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start group hover:text-blue-400 transition-colors duration-300">
                <span className="mr-2 group-hover:animate-bounce">📍</span>
                <span>{userData.footer.contact.location}</span>
              </li>
              <li className="flex items-start group">
                <span className="mr-2 group-hover:animate-bounce">📧</span>
                <a href={`mailto:${userData.footer.contact.email}`} className="hover:text-blue-400 transition-colors duration-300">
                  {userData.footer.contact.email}
                </a>
              </li>
              <li className="flex items-start group hover:text-blue-400 transition-colors duration-300">
                <span className="mr-2 group-hover:animate-bounce">📱</span>
                <span>{userData.footer.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p className="hover:text-white transition-colors duration-300">{userData.footer.copyright}</p>
          <p className="mt-2 text-sm hover:text-blue-400 transition-colors duration-300">
            Designed and developed with 
            <span className="mx-1 text-red-500 animate-pulse inline-block">❤️</span> 
            using React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;