'use client';

export default function HeroSection() {
  return (
    <section
      className="relative h-[1200px] bg-cover bg-center bg-no-repeat py-20"
      style={{
        height: 300,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=mekong%20delta%20tourism%20booking%20website%20hero%20image%2C%20beautiful%20vietnamese%20landscape%20with%20boats%2C%20tropical%20paradise%2C%20travel%20destination%2C%20vibrant%20colors%2C%20tourism%20promotion%2C%20inviting%20atmosphere%2C%20high%20quality%20photography&width=1200&height=400&seq=hero-booking-1&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Dong Bang Song Cuu Long <br />
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover the beauty of the Mekong Delta, experience unique culture and enjoy great cuisine </p>
            <div className="flex flex-col sm:flex-row gap-4 p-4">

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
