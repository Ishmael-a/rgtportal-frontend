import Avtr from "@/components/Avtr";
import defaultBG from "../assets/images/defaultBG.png";
import { avtrDets } from "@/constants";

const All_Teams = () => {
  return (
    <main className="p-4">
      <header className="text-[#706D8A] font-semibold text-3xl">Teams</header>

      <section className="pt-6 flex flex-wrap ">
        <div className="flex flex-col space-y-2 bg-white rounded-md p-2 min-w-12 shadow-md cursor-pointer hover:scale-[] transition-all duration-300 ease-in">
          <p className="font-medium p-[3px] bg-rgtpink w-fit text-white rounded-md text-xs">
            Mediboard
          </p>
          <img
            src={defaultBG}
            alt="default background"
            className="rounded-lg aspect-video w-full "
          />
          <p className="text-[#475569] font-medium text-sm">
            Project lead - Ishmael Abu Yusif
          </p>
          <div className="flex justify-between items-center">
            <div className="relative w-[80px] h-10">
              {avtrDets.map((avtr, index) => (
                <Avtr
                  key={index}
                  index={index}
                  avtr={avtr}
                  className="w-5 h-5 rounded-full"
                />
              ))}
            </div>
            <div className="flex space-x-1 text-[#768396] font-bold">
              <img src="/Check.svg" />
              <p className="text-sm text-nowrap">3/2300 completed</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default All_Teams;
