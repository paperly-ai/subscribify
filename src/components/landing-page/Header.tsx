import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "@/constants";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`flex items-center pt-5 px-2  justify-center z-100 top-0    z-50 fixed inset-x-0    lg:bg-n-8/90 ${openNavigation ? "bg-n-8 bg-white" : ""
        }`}
    >
      <div className="flex border bg-white  justify-between rounded-xl w-full md:max-w-[1200px] items-center px-2">

        <Link className="flex uppercase items-center justify-center gap-2 ml-2" to="/">
          <img src={"/icon.png"} width={20} height={20} alt="Paperly-ai" />
          <p className="font-bold text-sm">Paperly-Ai</p>
        </Link>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 bg-white right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative  z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-code text-xl uppercase transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-3 lg:-mr-0.25 md:text-xs lg:font-semibold ${item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center py-1 justify-center">
          <div className="flex gap-2 ">
            <Link to={'/auth'}>
              <Button size={'sm'} variant={'outline'} className=" hidden md:flex py-0 rounded-lg text-sm">
                Create Account
              </Button>
            </Link>
            <Link to={'/auth'}>
              <Button size={'sm'} className="flex py-0 rounded-lg text-sm">
                Get Started
              </Button>
            </Link>
          </div>

          <Button
            className="lg:hidden px-3"
            variant={null}
            onClick={toggleNavigation}
          >
            {openNavigation ? <X /> : <Menu />}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Header;
