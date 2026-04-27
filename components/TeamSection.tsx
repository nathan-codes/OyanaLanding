import Image from "next/image";
import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
};

export default function TeamSection({
  title = "Meet The Team",
  subtitle = "A diverse team of experts passionate about helping creators grow.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const fadeInUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const members: TeamMember[] = [
    {
      name: "Daps",
      role: "Product",
      description:
        "Spent two decades building products at YouTube, Amazon, and Google before starting Oyana to help creators grow.",
      image: "/images/team/dapo.jpg",
      linkedin: "https://www.linkedin.com/in/bakare/",
    },
    {
      name: "François",
      role: "Architect",
      description:
        "Architected large-scale systems at Amazon and Google, then designed the backend that powers Oyana.",
      image: "/images/team/francois.jpg",
      linkedin: "https://www.linkedin.com/in/fran%C3%A7ois-bonin-8942b/",
    },
    {
      name: "Arlene",
      role: "Operations",
      description:
        "Ran global teams at GE Healthcare and Royal Philips. At Oyana, she touches everything except the code.",
      image: "/images/team/arlene.jpg",
      linkedin: "https://www.linkedin.com/in/arlenesargeant/",
    },
    {
      name: "Nathan",
      role: "Engineer",
      description:
        "Turns ideas into prototypes, keeps engineering on track, and helps with marketing analytics.",
      image: "/images/team/nathan.jpg",
      linkedin: "https://www.linkedin.com/in/nathanturkson/",
    },
    {
      name: "Samuel",
      role: "Engineer",
      description:
        "Built production applications across Europe and Africa, then developed the core Oyana platform.",
      image: "/images/team/placeholder.jpg",
      linkedin: "https://www.linkedin.com/in/nyamekesse-samuel",
    },
    {
      name: "Tochie",
      role: "Marketing",
      description:
        "Storyteller who sweats the details. Leads brand awareness and creator relationships at Oyana.",
      image: "/images/team/Tochukwu's Picture.jpg",
      linkedin: "https://www.linkedin.com/in/tochukwu-falola",
    },
  ];

  return (
    <section
      id="team"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Animated background rings */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full"
          style={{ border: "1px solid var(--nav-border)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full"
          style={{ border: "1px solid var(--border-subtle)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-14">
          <motion.h2
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={fadeInUp.transition}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground"
          >
            {title}
            <br />
          
          </motion.h2>
          <motion.p
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-lg md:text-xl text-body mt-6 text-center"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-12 lg:gap-14 max-w-7xl mx-auto">
          {members.map((m, idx) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group relative rounded-3xl p-10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 flex flex-col"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "0 20px 60px -20px var(--glow-color)",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, var(--subtle-bg), transparent)`,
                }}
              />

              <div className="relative flex flex-col items-center flex-1">
                <div
                  className="w-36 h-36 mb-6 rounded-2xl p-1 overflow-hidden transition-transform duration-500 group-hover:rotate-3 shrink-0"
                  style={{
                    background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`,
                  }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        if (e?.currentTarget) {
                          e.currentTarget.src = "/placeholder-user.jpg";
                        }
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  {m.name}
                </h3>
                <p className="text-body text-center leading-relaxed text-sm flex-1">
                  {m.description}
                </p>
              </div>

              <div className="relative mt-auto pt-5 flex flex-col items-center gap-4">
                <div
                  className="text-center font-semibold tracking-wide uppercase text-sm text-primary"
                >
                  {m.role}
                </div>
                <motion.a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 cursor-pointer"
                  style={{
                    background: "var(--subtle-bg)",
                    color: "var(--primary)",
                  }}
                  aria-label={`Visit ${m.name}'s LinkedIn profile`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
