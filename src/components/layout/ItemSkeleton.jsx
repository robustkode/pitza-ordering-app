import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";

export default function ItemSkeleton() {
  return (
    <SkeletonTheme baseColor="#d8dee9" highlightColor="#444">
      <div className="flex-col flex text-center bg-itemBackground p-4 rounded-lg  mx-4 ">
        <div className="flex justify-center">
          <Image
            src={"/pizza-placeholder.png"}
            height={200}
            width={200}
            alt="pizza"
          />
        </div>

        <p className="px-8 pb-2 pt-8">
          <Skeleton count={1} height={30} />
        </p>
        <p className="px-8 p-2">
          <Skeleton count={1} height={30} />
        </p>
      </div>
    </SkeletonTheme>
  );
}
