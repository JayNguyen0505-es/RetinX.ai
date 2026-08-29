import SafeImage from "../SafeImage";

const PARTNERS = [
  { name: "USTH", src: "/assets/usth-logo.png" },
  { name: "CIE", src: "/assets/cie-logo.png" },
  { name: "Analytics Everywhere Lab", src: "/assets/aelab-logo.png" },
  { name: "UNB", src: "/assets/unb-logo.png" },
];

export default function PartnerLogos() {
  return (
    <section className="partners">
      <div className="container">
        <div className="partners-box">
          <p className="partners-title">Research affiliations &amp; support</p>

          <div className="partners-row">
            {PARTNERS.map((partner) => (
              <div className="partner" key={partner.name}>
                <SafeImage
                  src={partner.src}
                  alt={partner.name}
                  label={partner.name}
                  className="partner-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}