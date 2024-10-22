import Image from "next/image";

interface IImage {
  src: string;
  alt: string;
}

export function BannerPromo({ src, alt }: IImage) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
    />
  );
}
