import Image from "next/image";
import { Name } from "./name";
import { Description } from "./description";

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
            src={user.image ?? "https://github.com/samamedejones.png"}
            alt="foto de perfil"
            width={104}
            height={104}
            className="rounded-xl bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
            priority
            quality={100}
            />
        </div>

        <div>
            <Name initialName={user.name ?? "Digite seu nome..."} />

            <Description initialDescription={user.bio ?? "Digite sua biografia..."} />
        </div>

        <div>

        </div>
    </section>
  );
}