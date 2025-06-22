import Image from "next/image";

interface CardProfileProps {
    user: {
        id: string | null;
        name: string | null;
        username: string | null;
        bio: string | null;
        image: string | null;
    }
}


export function CardProfile({ user }: CardProfileProps) {
  return (
    <section className="w-full flex flex-col items-center mx-auto px-4">
        <div className="">
            <Image
            src={user.image ?? "https://www.github.com/samamedejones.png"}
            alt="foto de perfil"
            width={96}
            height={96}
            className="rounded-xl bg-gray-50 object-cover border-4 border-white"
            />
        </div>
    </section>
  );
}