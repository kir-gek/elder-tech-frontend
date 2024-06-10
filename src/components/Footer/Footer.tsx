import Logo from "assets/images/logo.svg";
import PhoneIcon from "assets/icons/Phone.svg";
import MailIcon from "assets/icons/mail.svg";
import LogoIns from "assets/icons/logoINS.svg";
import LogoVK from "assets/icons/logoVK.svg";
import LogoYT from "assets/icons/logoYOUT.svg";

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4 bg-white text-gray-800">

      <div className="flex items-center mb-4 md:mb-0">
        <img src={Logo} alt="Logo" className="h-6 mr-2" />
        <div>
          <div className="font-semibold">ElderTech</div>
          <div>© 2020-2024 ElderTech</div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-4 md:mb-0 md:ml-12">
        <div className="flex items-center mb-1">
          <img src={PhoneIcon} alt="Phone" className="h-4 mr-2" />
          <div>+7 (495) 111 22 33</div>
        </div>
        <div className="flex items-center">
          <img src={MailIcon} alt="Mail" className="h-4 mr-2" />
          <div>example@example.com</div>
        </div>
      </div>

      <div className="flex items-center">
        <img src={LogoIns} alt="Instagram" className="h-8 mr-4" />
        <img src={LogoVK} alt="VK" className="h-8 mr-4" />
        <img src={LogoYT} alt="YouTube" className="h-8" />
      </div>
    </div>
  );
};
