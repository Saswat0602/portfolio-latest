export interface ProjectData {
  project_name: string;
  code_link: string;
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
  introduction: "Hi, I'm Saswat Ranjan. A passionate Front-end React Developer & MERN stack Developer based in Bhubaneswar.",
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
      code_link: "https://github.com/..."
    },
    {
      project_name: "Spotify-Music-App",
      code_link: "https://github.com/..."
    },
    {
      project_name: "Movie-App",
      code_link: "https://github.com/..."
    },
    {
      project_name: "Zoom-Clone-App",
      code_link: "https://github.com/..."
    },
    {
      project_name: "Note-Taker",
      code_link: "https://github.com/..."
    },
    {
      project_name: "Food-Ordering-App",
      code_link: "https://github.com/..."
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