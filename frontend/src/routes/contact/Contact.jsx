import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
//import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";

const Contact = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");
  const [emailer, setEmailEr] = useState(false);
  const [phoneer, setPhoneEr] = useState(false);
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const form = useRef();
  const handleSubmit = async () => {
    try {
      if (!email || !message || !subject) {
        return toast.error("All fields are required!");
      } else if (isNaN(phone) || phone.length < 10 || phone.length > 12) {
        setPhoneEr(true);
        return toast.error("Invalid phone number");
      } else if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3) {
        return toast.error("Invalid name");
      }

   /*   emailjs
        .sendForm("service_qzxl6jp", "template_w9kvgrw", form.current, {
          publicKey: "KWleLqdJwS4tz9FRZ",
        })
        .then(
          () => {
            toast.success("Message sent");
            setEmail("");
            setMessage("");
            setName("");
            setPhone("");
            setSubject("");
          },
          (error) => {
            toast.error("Message not sent", error.message);
          }
        ); */
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!email.match(validRegex)) {
      setEmailEr(true);
    } else {
      setEmailEr(false);
    }
  }, [email]);

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: `url('https://www.kenchic.com/wp-content/uploads/2023/07/shutterstock_1480667087.jpg')`,
      }}
    >

      <div className="flex justify-end 800px:px-2 px-1 items-center mt-[4rem]">
        <div className="800px:w-[37%] w-full 800px:p-5 p-2 rounded-xl bg-blue-200 my-2 800px:mx-[6rem]">
          <div className="bg-slate-50 p-2">
            <h1 className="800px:text-4xl text-xl text-blue-600 font-bold my-2 text-center">
              Share Your Feedback
            </h1>

            <form className="mt-[3rem]" ref={form}>
              <div className="800px:flex block justify-around">
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your name"
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
                <input
                  type="text"
                  name="subject"
                  id="Subject"
                  value={subject}
                  placeholder="Enter Subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
              </div>
              <div className="800px:flex block justify-around my-[2rem]">
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  className={`${
                    emailer ? "border-red-500" : "border-blue-500"
                  } outline-none border-b  w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400`}
                />
                <input
                  type="number"
                  name="user_phone"
                  min={0}
                  value={phone}
                  minLength={10}
                  maxLength={12}
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className={`${
                    phoneer ? "border-red-500" : "border-blue-500"
                  } outline-none border-b w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400`}
                />
              </div>

              <div className="my-[3rem] w-full px-5">
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  cols="60"
                  className="w-full outline-none border-b border-blue-500 hover:border-yellow-400"
                />
              </div>

              <div
                className="my-[3rem] rounded-[20px] bg-yellow-400 flex justify-center items-center w-max px-6 py-2 mx-auto cursor-pointer hover:bg-yellow-200"
                onClick={handleSubmit}
              >
                <div className="text-slate-50 font-semibold text-center">
                  Submit
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
