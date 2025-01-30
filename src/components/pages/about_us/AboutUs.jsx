import { FaRocket, FaHandsHelping, FaRegSmileBeam } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          About Toy House
        </h1>
        <p className="text-center text-gray-700 text-lg mb-8">
          At Toy House, we believe in the magic of childhood and the joy of
          imagination. Our mission is to bring smiles to young faces and foster
          creativity through a wide range of toys that are not only fun but
          educational.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Mission Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">
              <FaRocket />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To inspire young minds with toys that stimulate creativity,
              learning, and fun while ensuring the highest safety standards.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">
              <FaHandsHelping />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To be the most beloved toy store by parents and children,
              creating a legacy of joy, quality, and trust in every home.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">
              <FaRegSmileBeam />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Values
            </h2>
            <p className="text-gray-600">
              We prioritize safety, inclusivity, and sustainability while
              bringing the joy of play to children of all ages and
              backgrounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
