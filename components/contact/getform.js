import { useEffect, useState } from "react";
import Image from "next/image";

import Contact1 from "../../public/images/contact.jpg";
import { Backicon, Shareicon } from "../common/svgicon";
import { ContactApi } from "@/Datas/endpoints/contact";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { HTMLParser } from "@/utils/HTMLParser";

const ContactForm = ({ data, contact, blog }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [utmSource, setUtmSource] = useState("")
  const [utmCamp, setUtmCamp] = useState("")
  const [utmMedium, setUtmMedium] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setUtmSource(searchParams.get("utm_source") || "")
    setUtmCamp(searchParams.get("utm_campaign") || "")
    setUtmMedium(searchParams.get("utm_medium") || "")
  }, [])


  const onPhoneChange = (value) => {
    setPhone(value);
    const numericLength = value.replace(/\D/g, "").length;

    if (numericLength >= 5 && numericLength <= 13) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  // Also used as react-hook-form's invalid handler, so the phone field turns
  // red even when another required field is what blocked the submit.
  const validatePhone = () => {
    const phoneLength = phone.replace(/\D/g, "").length;
    const invalid = !phone || phoneLength < 5 || phoneLength > 13;
    setPhoneError(invalid);
    return !invalid;
  };

  const onSubmit = async (data) => {
    setErrorMessage("");

    if (!validatePhone()) return;

    if (!executeRecaptcha) {
      setErrorMessage("reCAPTCHA not ready");
      return;
    }

    const token = await executeRecaptcha("contact_form_submit");

    const pageUrl = typeof window !== 'undefined' ? window.location.origin + router.asPath : '';

    const payload = {
      ...data,
      phone_number: `+${phone}`,
      recaptcha_token: token,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCamp,
      source_url: pageUrl,
      ...(blog ? { lead_type: `Blog Details` } : {})
    };

    try {
      const response = await ContactApi.contact(payload); // Make sure ContactApi.career supports JSON
      // console.log("Submitted:", response);
      reset();
      if (response?.status === 200) {
        router.push("/thank-you");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className=" pt-[50px] pb-[50px]">
      <div className="container">
        <div className="contact_form_sec">
          <div className="grid md:grid-cols-2 gap-[100px] items-center">
            <div>
              <Image src={Contact1} alt="Get in touch with CDA India" width={600} height={600} />
            </div>

            <div>
              <div className='h4'>{HTMLParser(data?.content?.title_7)}</div>
              <p> {data?.content?.description}</p>
              <form onSubmit={handleSubmit(onSubmit, validatePhone)}>
                <div className="grid md:grid-cols-2 gap-[25px] mt-[15px]">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your Name"
                      className={errors.name && "border border-red-500"}
                    />
                  </div>

                  <div>
                    <label>Email ID</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      })}
                      placeholder="Enter your Email"
                      className={errors.email && "border border-red-500"}
                    />
                  </div>

                  <div>
                    <label>Phone Number</label>
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={onPhoneChange}
                      enableSearch
                      inputClass={`w-full ${phoneError ? "border-red-500" : "border-gray-300"
                        }`}
                      inputStyle={{
                        width: "100%",
                        height: "54px",
                        paddingLeft: "48px",
                        borderColor: phoneError ? "#ef4444" : "#d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                      buttonStyle={{
                        borderColor: phoneError ? "#ef4444" : "#cacaca",
                      }}
                    />
                  </div>

                  <div>
                    <label>Location</label>
                    <input
                      type="text"
                      {...register("location", {
                        required: "location is required",
                      })}
                      placeholder="Enter your Location"
                      className={errors.location && "border border-red-500"}
                    />
                  </div>
                </div>

                <div className="py-[25px]">
                  <label>Message</label>
                  <textarea
                    {...register("message")}
                    placeholder="Please describe your Enquiry"
                  />
                </div>


                {errorMessage && (
                  <p className="form_error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn ripple-button z-0 ${isSubmitting ? "bg-gray-400" : "bg-black"
                      }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
