export interface ProjectData {
  project_name: string;
  code_link: string;
  description: string;
  image: string;
  category: string;
  demo_link?: string;
  technologies: string[];
}

export interface ExperienceData {
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  logo: string;
}

export interface SocialLink {
  href: string;
}

export interface QuickLink {
  label: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
}

export interface FooterData {
  title: string;
  description: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  contact: ContactInfo;
  copyright: string;
}

export interface EducationData {
  postgraduate: string;
  undergraduate: string;
}

export interface AboutData {
  current_position: string;
  education: EducationData;
  skills: string[];
  description: string;
  description2: string;
  location: string;
  email: string;
}

export interface UserData {
  name: string;
  location: string;
  title: string;
  introduction: string;
  about: AboutData;
  Projects: ProjectData[];
  experience: ExperienceData[];
  contact: {
    message: string;
  };
  footer: FooterData;
}

const userData: UserData = {
  name: "Saswat Ranjan",
  location: "Bhubaneswar, Odisha, India",
  title: "MERN/Front-End Developer",
  introduction: "Hi, I'm Saswat Ranjan. A passionate  React & React-Native Developer.",
  about: {
    current_position: "Software Development Engineer I (SDE 1) at HyScaler",
    education: {
      postgraduate: "MCA from United School of Business Management, Bhubaneswar",
      undergraduate: "BSc from Utkal University"
    },
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Git",
      "GitHub",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Tailwind",
      "Bootstrap",
      "GitHub",
      "Git",
      "MongoDB",
      "Java (SE)",
      "C"
    ],
    description: "I'm a Software Development Engineer (SDE 1) at HyScaler, specializing in React, React Native, and Node.js. With a Master's in Computer Applications,",
    description2: "I focus on building responsive UIs and backend solutions. I'm passionate about continuous learning and keeping up with industry trends..",
    location: "Bhubaneswar, Odisha, India",
    email: "contact@saswatmohanty.com"
  },
  Projects: [
    {
      project_name: "Yelp-Camp",
      code_link: "https://github.com/...",
      description: "Yelp-Camp is a comprehensive camping platform built with modern web technologies, showcasing best practices in development and user experience. This project demonstrates skills in responsive design, state management, and API integration.",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop",
      category: "web",
      demo_link: "https://example.com/yelp-camp",
      technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      project_name: "Spotify-Music-App",
      code_link: "https://github.com/...",
      description: "Spotify-Music-App is a music streaming application that mimics Spotify's core functionality. The project showcases advanced state management, audio processing, and integration with external APIs.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      category: "web",
      technologies: ["React", "Redux", "Web Audio API", "CSS"]
    },
    {
      project_name: "Movie-App",
      code_link: "https://github.com/...",
      description: "Movie-App provides users with information about movies, including ratings, descriptions, and trailers. This application demonstrates integration with movie databases and responsive design principles.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
      category: "web",
      demo_link: "https://example.com/movie-app",
      technologies: ["React Native", "JavaScript", "API Integration"]
    },
    {
      project_name: "Zoom-Clone-App",
      code_link: "https://github.com/...",
      description: "Zoom-Clone-App is a real-time video conferencing platform that allows users to create and join meetings, chat, and share screens. This project showcases WebRTC implementation and real-time data handling.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1000&auto=format&fit=crop",
      category: "web",
      demo_link: "https://example.com/zoom-clone",
      technologies: ["WebRTC", "Socket.io", "Node.js", "React"]
    },
    {
      project_name: "Note-Taker",
      code_link: "https://github.com/...",
      description: "Note-Taker is a minimalist application for creating, organizing, and searching notes. This project demonstrates local storage implementation and responsive UI design.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
      category: "app",
      technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage"]
    },
    {
      project_name: "Food-Ordering-App",
      code_link: "https://github.com/...",
      description: "Food-Ordering-App allows users to browse restaurants, view menus, and place orders. This project showcases cart functionality, payment integration, and a smooth user experience.",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000&auto=format&fit=crop",
      category: "mobile",
      demo_link: "https://example.com/food-order",
      technologies: ["React Native", "Firebase", "Redux", "Payment Gateway"]
    }
  ],
  experience: [
    {
      title: "Software Development Engineer 1",
      company: "HyScaler",
      duration: "Apr 2025 - present",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description: "Working on React Native, and developing multiple web and mobile/Web applications.",
      skills: ["Django REST Framework", "React Native", "Swift"],
      logo: "/path_to_logo_image"
    },
    {
      title: "Junior Software Developer",
      company: "HyScaler",
      duration: "Apr 2024 - Apr2024",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Full-time",
      description: "Working on Django REST Framework, React Native, and developing multiple web and mobile applications.",
      skills: ["Django REST Framework", "React Native", "+5 skills"],
      logo: "/path_to_logo_image"
    },
    {
      title: "Apprentice Trainee",
      company: "HyScaler",
      duration: "Aug 2023 - Mar 2024 (8 mos)",
      location: "Bhubaneswar, Odisha, India · On-site",
      type: "Trainee",
      description: "Gaining hands-on experience in React.js, React Native, and other web technologies.",
      skills: ["React.js", "React Native", "+4 skills"],
      logo: "/path_to_logo_image"
    }
  ],
  contact: {
    message: "Feel free to contact with me. Let's Talk. Don't wish for it! Work for it!"
  },
  footer: {
    title: "Saswat.dev",
    description: "Junior Software Developer specialized in React, React Native, and Node.js development. Based in Bhubaneswar, Odisha, India.",
    socialLinks: [
      { href: "#" },
      { href: "#" },
      { href: "#" },
      { href: "#" },
      { href: "mailto:contact@saswatmohanty.com" }
    ],
    quickLinks: [
      { label: "About" },
      { label: "Experience" },
      { label: "Education" },
      { label: "Skills" },
      { label: "Projects" },
      { label: "Certifications" }
    ],
    contact: {
      location: "Bhubaneswar, Odisha, India",
      email: "contact@saswatmohanty.com",
      phone: "+91 98765 43210"
    },
    copyright: "© 2025 Saswat Ranjan Mohanty. All rights reserved."
  }
};

export default userData; 