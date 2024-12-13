import Image from "next/image";
import TimeSinceRelease from "./components/TimeSinceRelease";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="home"
        className="bg-white dark:bg-gray-900 bg-cover bg-center relative py-52"
        style={{backgroundImage: "url('/KSW_52.jpg')"}}
      >
        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-30"></div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            千葉工業大学 <br />
            高度技術者育成プログラム
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Growing Advanced and Refined space Development <br />
            Engineers in succession and under the satellite
          </p>
        </div>
      </section>

      <TimeSinceRelease />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <Image
                src="/service1.svg"
                alt="Service 1"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                Service One
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Description of service one. We provide exceptional service to
                our clients.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <Image
                src="/service2.svg"
                alt="Service 2"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                Service Two
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Description of service two. Our expertise ensures quality
                results.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <Image
                src="/service3.svg"
                alt="Service 3"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                Service Three
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Description of service three. We deliver on time and within
                budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            About Us
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <Image
                src="/about-us.jpg"
                alt="About Us"
                width={600}
                height={400}
                className="rounded-lg shadow"
              />
            </div>
            <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Get in Touch
          </h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
