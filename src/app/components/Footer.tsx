import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  {href: "#privacy", label: "Privacy Policy"},
  {href: "#terms", label: "Terms of Service"},
  {href: "#contact", label: "Contact"},
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={30}
            height={30}
            className="dark:invert"
          />
          <span className="text-gray-800 dark:text-white font-bold">
            Your Company
          </span>
        </div>
        <div className="flex space-x-6">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
