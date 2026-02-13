const testimonials = [
  {
    quote:
      '"Prople gives us instant NOI and cash-flow clarity. Our owners finally see the Nestora-style view they were asking for."',
    name: "Sarah Mitchell",
    role: "Property Manager, Urban Living Properties",
  },
  {
    quote:
      '"The read-only accountant ledger means I can audit without worrying about someone editing a transaction. Huge win for compliance."',
    name: "James Chen",
    role: "Real Estate Investor, Chen Investment Group",
  },
  {
    quote:
      '"We consolidated three different systems into Prople. Maintenance alerts now hit owners instantly and the team works from the same source of truth."',
    name: "Maria Rodriguez",
    role: "Asset Manager, Cornerstone Real Estate",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f1e3d5] py-20 md:py-24" id="reviews">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#8b5e3c]">Testimonials</span>
          <h2 className="mt-5 font-display text-[40px] font-bold leading-[1.08] tracking-tight text-[#2c1f18] md:text-[64px]">Trusted by property teams</h2>
          <p className="mt-5 text-[18px] text-[#4f3523] md:text-[21px]">Owners, managers, accountants, and admins stay aligned in Prople.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-3xl border border-[#e7d8c9] bg-white p-7 shadow-sm">
              <p className="text-[#b07a4a]">★★★★★</p>
              <p className="mt-5 text-xl italic leading-relaxed text-[#3b281d]">{testimonial.quote}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f1e3d5] text-sm font-bold text-[#8b5e3c]">PR</div>
                <div>
                  <p className="text-lg font-bold text-[#2c1f18]">{testimonial.name}</p>
                  <p className="text-base text-[#7b614d]">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
