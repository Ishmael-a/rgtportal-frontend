import { ClassNameValue } from "tailwind-merge";

interface ITimeOffModal {
  title: string;
  buttons?: { name: string; fn: () => void }[];
  buttonClassName?: ClassNameValue;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  back?: boolean;
  backFn?: () => void;
}

const TimeOffModal: React.FC<ITimeOffModal> = ({
  title,
  buttons,
  children,
  buttonClassName,
  onSubmit,
  back = false,
  backFn,
}) => {
  return (
    <div
      className="fixed inset-0  backdrop-blur-xs  flex items-start justify-end"
      style={{ zIndex: 170 }}
    >
      {back && (
        <div className="relative h-screen flex flex-col justify-center p-5">
          <img
            src="Down 2.svg"
            className="-rotate-90 bg-white p-2 rounded-full shadow-neutral-400 shadow-lg top-10 border hover:bg-slate-100 transition-all duration-300 ease-in cursor-pointer"
            onClick={backFn}
          />
        </div>
      )}
      <div className="bg-white shadow-lg  max-w-md w-full p-6 h-screen">
        <h2 className="text-xl font-semibold mb-4 text-[#706D8A]">{title}</h2>

        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-start h-full"
        >
          {children}

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {buttons &&
              buttons.map((item, index) => (
                <button
                  key={index}
                  type={
                    item.name.toLowerCase() !== "cancel" ? "submit" : "button"
                  }
                  onClick={item.fn}
                  className={`px-6 py-4 w-1/2 ${
                    item.name.toLowerCase() === "cancel"
                      ? "text-red-600 border-red-500 hover:bg-gray-100"
                      : buttonClassName ?? ""
                  }  font-medium border-2 rounded-md  cursor-pointer`}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeOffModal;
