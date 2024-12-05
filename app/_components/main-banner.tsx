import Image from "next/image";
import Search from "./search";

const MainBanner = () => {
  return (
    <div className="h-[500px] w-full bg-primary">
      <div className="mx-auto flex h-full max-w-[1224px] items-end justify-between max-xl:px-5">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-[48px] font-bold text-white">Está com fome?</h1>
          <span className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </span>

          <div className="mt-8 rounded-sm bg-white p-6">
            <Search isSecondary />
          </div>
        </div>
        <Image src="/yakisoba.png" alt="yakisoba" width={450} height={377} />
      </div>
    </div>
  );
};

export default MainBanner;
