import { motion } from "framer-motion";

// CMS fields come back as null, an empty string or whitespace depending on how
// the office was saved, so everything gets normalised before it is checked.
const text = (value) => (typeof value === "string" ? value.trim() : "");

const ContactCard = ({ office, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      className="cont_list flex flex-col"
    >
      {office?.title && <h4>{office?.title}</h4>}

      {office?.map && (
        <div className="cont_list_map">
          <iframe
            src={office?.map}
            width="100%"
            height="100%"
            title={office?.title || "Office location"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="cont_list_body flex flex-col gap-[16px] mt-[22px]">
        {office?.address && (
          <div className="cont_row ">
            <p>{office?.address}</p>
          </div>
        )}

        {office?.email && (
          <div className="cont_row ">
            <a href={`mailto:${office?.email}`}>{office?.email}</a>
          </div>
        )}

        {office?.phones?.length > 0 && (
          <div className="cont_row ">
            <div className="flex flex-col">
              {office?.phones?.map((phone, phoneIndex) => (
                <a key={phoneIndex} href={`tel:${phone.replace(/\s+/g, "")}`}>
                  {phone}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ContactList = ({ data }) => {
  const content = data?.content;

  const offices = [
    {
      title: content?.title_1,
      map: content?.corporate_address_map,
      address: content?.corporate_address,
      email: content?.corporate_email,
      phones: [
        content?.corporate_phone_number_1,
        content?.corporate_phone_number_2,
        content?.corporate_phone_number_3,
      ],
    },
    {
      title: content?.title_5,
      map: content?.registered_address_map,
      address: content?.registered_address,
      email: content?.registered_email,
      phones: [
        content?.registered_phone_number_1,
        content?.registered_phone_number_2,
        content?.registered_phone_number_3,
      ],
    },
    {
      title: content?.title_6,
      map: content?.abudhabi_registered_address_map,
      address: content?.abudhabi_registered_address,
      email: content?.abudhabi_registered_email,
      phones: [
        content?.abudhabi_registered_phone_number_1,
        content?.abudhabi_registered_phone_number_2,
        content?.abudhabi_registered_phone_number_3,
      ],
    },
    {
      title: content?.title_8,
      map: content?.office_address_map,
      address: content?.office_address,
      email: content?.office_email,
      phones: [
        content?.office_phone_number_1,
        content?.office_phone_number_2,
        content?.office_phone_number_3,
      ],
    },
  ]
    .map((office) => ({
      title: text(office?.title),
      map: text(office?.map),
      address: text(office?.address),
      email: text(office?.email),
      // Any of the three phone slots can be blank, which used to leave a
      // trailing comma hanging on its own.
      phones: (office?.phones || []).map(text).filter(Boolean),
    }))
    // An office the CMS has not filled in yet would otherwise render as an
    // empty box in the row. A heading on its own is not contact details, so it
    // is not enough to keep the box.
    .filter(
      (office) =>
        office.address || office.email || office.phones.length > 0 || office.map
    );

  if (!offices.length) return null;

  // Four across is the full row, but once a box is hidden for want of data a
  // fixed four-column grid leaves a hole on the end of the row instead.
  // Tailwind scans for whole class names, so these have to stay literal.
  const columns =
    offices.length >= 4
      ? "md:grid-cols-2"
      : offices.length === 3
        ? "md:grid-cols-2 xl:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <section className="contact_list_sec pt-[50px] pb-[50px]">
      <div className="container">
        <div className={`grid ${columns} gap-[25px]`}>
          {offices?.map((office, index) => (
            <ContactCard key={index} office={office} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactList;
