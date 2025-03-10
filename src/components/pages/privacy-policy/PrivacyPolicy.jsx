import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pb-20 w-11/12 md:w-4/5 mx-auto p-6 dark:bg-white dark:text-black shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <span className="font-semibold">Toy House</span>, we value the trust
        you place in us. We adhere to the highest standards for secure
        transactions and customer information privacy. Please read the following
        statement to understand our information-gathering and dissemination
        practices.
      </p>

      <h2 className="text-xl font-semibold mt-6">Note:</h2>
      <p className="mb-4">
        Our privacy policy may change at any time without prior notice. Please
        review this policy periodically to stay informed about any updates.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        Collection of Personally Identifiable Information
      </h2>
      <p className="mb-4">
        When you use our Website, we collect and store your personal information
        provided by you from time to time. Our primary goal is to offer you a
        safe, efficient, smooth, and customized experience.
      </p>
      <p className="mb-4">
        We may also automatically track certain information about your behavior
        on our Website for internal research to better understand user
        demographics and preferences.
      </p>

      <h2 className="text-xl font-semibold mt-6">Use of Cookies</h2>
      <p className="mb-4">
        We use cookies to analyze web traffic, measure promotional
        effectiveness, and ensure a secure browsing experience. You may choose
        to decline cookies, but this may limit certain Website features.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        Sharing of Personal Information
      </h2>
      <p className="mb-4">
        We may share personal information with our affiliates and corporate
        entities to market relevant products and services. However, you have the
        option to opt out.
      </p>
      <p className="mb-4">
        Personal information may be disclosed if required by law or in response
        to legal processes.
      </p>

      <h2 className="text-xl font-semibold mt-6">Security Precautions</h2>
      <p className="mb-4">
        We implement strict security measures to protect your data. When
        accessing or modifying your account details, we use secure servers to
        ensure data protection.
      </p>

      <h2 className="text-xl font-semibold mt-6">Choice/Opt-Out</h2>
      <p className="mb-4">
        Users can opt out of non-essential communications from us and our
        partners. Visit our unsubscribe page to manage your preferences.
      </p>

      <h2 className="text-xl font-semibold mt-6">Advertisements</h2>
      <p className="mb-4">
        We use third-party advertising companies that may collect non-personal
        data to show relevant advertisements.
      </p>

      <h2 className="text-xl font-semibold mt-6">Delivery Conditions</h2>
      <p className="mb-4">
        Products will be delivered to the ground floor of the customer's
        address, subject to road conditions and accessibility.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        Mobile Financial Offer Conditions
      </h2>
      <p className="mb-4">
        Any offers provided through mobile financial services are solely the
        responsibility of the concerned financial authority.
      </p>

      <h2 className="text-xl font-semibold mt-6">Questions?</h2>
      <p className="">
        For any questions regarding this statement, please{" "}
        <span className="font-semibold">contact us.</span>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
