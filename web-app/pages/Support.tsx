import React from 'react';

const Support: React.FC = () => {
  return (
    <div style={{ padding: '2rem', color: 'var(--text-color)' }}>
      <h1>Support</h1>
      <p>Welcome to the support page. Here you can find resources and documentation to help you use our platform effectively.</p>
      <section>
        <h2>Getting Started</h2>
        <p>Information about wallet setup, connecting, and navigating through our platform.</p>
      </section>
      <section>
        <h2>FAQs</h2>
        <p>Find answers to common questions about our services, features, and functionalities.</p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>If you need further assistance, please reach out to our support team at support@armeni.com.</p>
      </section>
    </div>
  );
};

export default Support;
