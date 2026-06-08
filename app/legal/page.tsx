'use client'

import { useState } from 'react'

export default function LegalPage() {
  const [tab, setTab] = useState<'terms' | 'privacy'>('terms')

  const styles = {
    container: {
      padding: 30,
      fontFamily: 'Arial',
      lineHeight: 1.6,
    },
    tabBtn: {
      marginRight: 10,
      padding: 10,
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderRadius: 6,
    },
    activeTab: {
      background: '#111',
      color: '#fff',
    },
    box: {
      marginTop: 20,
      padding: 20,
      border: '1px solid #ddd',
      borderRadius: 10,
    },
  }

  return (
    <div style={styles.container}>
      <b>Legal Information</b>
      

<h3>

 🧾 About Our Platform </h3>

<p>This platform is a digital financial technology application that provides users with a virtual wallet interface for managing and viewing stored balances, simulated or real transactions, and related account activity. </p>

<p>The service is designed to allow users to: 

</p>

<li> Create and manage a secure user account </li>
<li> Access a personal wallet dashboard </li>
<li> View wallet balance and transaction history </li>
<li> Initiate and receive payment-related actions through supported third-party payment providers </li>
<li> Update profile information such as nickname and security preferences </li>
<li> Upload identity verification documents where required (KYC) </li>

<h3>Our platform may integrate with third-party financial infrastructure providers such as payment processors and authentication services to enable deposits, withdrawals, and identity verification. </h3>

---

<h3> ⚠️ Important Clarification </h3>

<p>Swyft access is **not a bank**, **not a financial institution**, and does not directly hold or issue bank accounts. </p>

We do not:

<li> Provide banking services </li>
<li> Offer loans, credit, or interest-bearing accounts </li>
<li> Guarantee investment returns or financial gains </li>
<li> Act as a custodian of regulated financial assets </li>

<h3>All financial transactions are processed through authorized third-party payment providers where applicable. </h3>

---

<h3> 🔐 Account Responsibility </h3>

<p>Users are responsible for maintaining the confidentiality of their login credentials, recovery information, and any security-related authentication methods. Any activity performed under a user’s account is considered authorized unless otherwise reported. </p>

---

<h3> 🧠 Service Availability </h3>

<p>We aim to provide continuous access to the platform; however, service availability may be affected by: </p>

<li> Maintenance or system upgrades </li>
<li> Third-party service disruptions </li>
<li> Network or infrastructure failures </li>
<li> Security-related interventions </li>

<p>We do not guarantee uninterrupted access at all times. </p>

---

<h3> 🔄 Changes to Service </h3>

<p>We reserve the right to modify, update, suspend, or discontinue any part of the service at any time to improve functionality, security, or compliance with applicable regulations. Continued use of the platform constitutes acceptance of such changes. </p>

---


<h3> 💡 How We Help Users </h3>

<p>Our platform is built to simplify how users interact with digital money management and financial services through a secure, modern, and user-friendly interface. </p>

<p>We help users by providing a centralized system where they can: </p>

<p>* Easily access and manage their digital wallet from any device </p>
<p>* Track balances and transaction activity in real time </p>
<p>* Send and receive payments through integrated payment service providers </p>
<p>* Secure their account using modern authentication and recovery methods </p>
<p>* Maintain control over their financial activity in one organized dashboard </p>
<p>* Access identity verification tools (KYC) where required for compliance and security </p>

---

<h3> 🚀 Our Goal </h3>

<p>Our goal is to reduce complexity in digital financial interactions by combining multiple services into one simple platform interface. </p>

<p>We aim to provide a smooth user experience where individuals can interact with payment systems without needing to navigate multiple disconnected tools or services. </p>

---

<h3> 🔐 Security and Trust </h3>

<p>We prioritize user security by implementing authentication systems, secure data handling practices, and integration with trusted third-party financial infrastructure providers.

However, users remain responsible for safeguarding their account credentials and recovery information. </p>

---

<h3> ⚠️ Important Note </h3>

While we facilitate access to financial tools and services through third-party providers, we do not directly operate as a financial institution or bank, and we do not independently issue or hold regulated financial funds.

---




      {/* TABS */}
      <div>
        <button
          style={{
            ...styles.tabBtn,
            ...(tab === 'terms'
              ? styles.activeTab
              : {}),
          }}
          onClick={() => setTab('terms')}
        >
          Terms & Conditions
        </button>

        <button
          style={{
            ...styles.tabBtn,
            ...(tab === 'privacy'
              ? styles.activeTab
              : {}),
          }}
          onClick={() => setTab('privacy')}
        >
          Privacy Policy
        </button>
      </div>

      {/* TERMS */}
      {tab === 'terms' && (
        <div style={styles.box}>
          <h2>Terms & Conditions</h2>

          <p>
            By using this platform, you agree to the following terms.
          </p>

          <h3>1. Service Description</h3>
          <p>
            This platform provides a digital wallet interface for storing,
            viewing, and managing user balances and transactions. We do not
            operate as a bank or licensed financial institution.
          </p>

          <h3>2. No Banking Services</h3>
          <p>
            We are not a bank, credit institution, or financial service provider.
            All wallet features are for interface and record-keeping purposes only.
          </p>

          <h3>3. User Responsibility</h3>
          <p>
            Users are responsible for securing their login credentials, transfer PINs,
            and recovery phrases. We are not liable for unauthorized access due to user negligence.
          </p>

          <h3>4. Service Changes</h3>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of the service at any time.
            We may update these terms periodically, and continued use of the platform means acceptance of changes.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
We are not liable for any direct, indirect, incidental, or consequential losses, including but not limited to financial loss, transaction errors, or data loss arising from the use or inability to use the platform. Users use the platform at their own risk.
          </p>

          <h3>6. Governing Use</h3>
          <p>
            Users agree not to misuse the platform for fraudulent, illegal, or unauthorized financial activity.
          </p>
          

---

<h3># 📩 REPORTING ISSUES & SUPPORT </h3>

---

<h4> 🛠️ How to Report an Issue </h4>

<p>If you experience any problems while using the platform, we encourage you to report them so we can assist you as quickly as possible.

To help us resolve your issue efficiently, please include the following information in your message:

* A clear description of the issue you are experiencing
* The page or feature where the issue occurred
* The time and date the issue happened (if possible)
* Screenshots or screen recordings (if available)
* The email address associated with your account

Providing detailed information helps us identify and resolve problems faster. </p>

---

<h3># 📧 Where to Send Support Requests </h3>

<p>All support requests and issue reports should be sent to: </p>

<p>👉 [yourveryownhuey@gmail.com] </p>



---

<h3> ⏱️ Response Time </h3>

<p>We aim to respond to all support requests as quickly as possible. Response times may vary depending on the complexity of the issue and current support volume. </p>

---

<h3> 🔐 Security-Related Issues </h3>

<p>If you are reporting a security-related issue (such as unauthorized access or suspicious activity), please include “SECURITY ISSUE” in your subject line so it can be prioritized. </p>

---

<h3> 🧠 Important Note </h3>

<p>We may be unable to process requests submitted through unofficial channels such as social media messages or third-party platforms quickly. Support requests should be submitted via the official support email above to ensure faster responses. </p>

---
<b>THANK YOU FOR CHOOSING SWYFT ACCESS,ENJOY.</b>


        </div>
      )}

      {/* PRIVACY */}
      {tab === 'privacy' && (
        <div style={styles.box}>
          <h2>Privacy Policy</h2>

          <h3>1. Data We Collect</h3>
          <p>
            We collect email addresses, authentication data, and wallet-related
            information required to provide services.
          </p>

          <h3>2. How We Use Data</h3>
          <p>
            Data is used for authentication, wallet management, transaction tracking,
            and service improvement.
          </p>

          <h3>3. Data Storage</h3>
          <p>
            All data is securely stored using third-party backend services.
            Sensitive information such as passwords are never stored in plain text.
          </p>

          <h3>4. Third Parties</h3>
          <p>
            We may use third-party services such as authentication and payment providers
            to operate core features.
          </p>

          <h3>5. Security</h3>
          <p>
            We implement reasonable security measures, but cannot guarantee absolute security
            of user data transmitted over the internet.
          </p>

          <h3>6. User Rights</h3>
          <p>
            Users may request deletion of their data where applicable.
            
          </p>
          
        <b>THANK YOU FOR CHOOSING SWYFT ACCESS,ENJOY.</b>
          
        </div>
      )}
    </div>
  )
}
