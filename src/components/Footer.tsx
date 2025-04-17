import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: "#", icon: <FiGithub size={20} />, label: "GitHub" },
    { href: "#", icon: <FiLinkedin size={20} />, label: "LinkedIn" },
    { href: "#", icon: <FiTwitter size={20} />, label: "Twitter" },
    { href: "#", icon: <FiInstagram size={20} />, label: "Instagram" },
    { href: "mailto:contact@saswatmohanty.com", icon: <FiMail size={20} />, label: "Email" }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Saswat.dev</h3>
            <p className="text-gray-300 leading-relaxed">
              Junior Software Developer specialized in React, React Native, and Node.js development. 
              Based in Bhubaneswar, Odisha, India.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Contact Info
              <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Bhubaneswar, Odisha, India</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a href="mailto:contact@saswatmohanty.com" className="hover:text-blue-400 transition-colors">
                  contact@saswatmohanty.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📱</span>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
          <p>© {currentYear} Saswat Ranjan Mohanty. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed and developed with ❤️ using React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 