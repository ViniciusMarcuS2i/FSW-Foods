import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  route: string;
}

const SectionTitle = ({ title, route }: SectionTitleProps) => {
  return (
    <div className="mx-auto flex max-w-[1224px] items-center justify-between max-lg:max-w-full">
      <h2 className="font-semibold">{title}</h2>

      <Button
        variant={"ghost"}
        className="h-fit p-0 text-primary hover:bg-transparent"
        asChild
      >
        <Link href={`/${route}/recommended`}>
          Ver todos <ChevronRight size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default SectionTitle;
