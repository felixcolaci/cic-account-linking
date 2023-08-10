import { useLocation } from "react-router-dom";

export const Layout = ({ children }: any) => {
  const location = useLocation();
  const displayImage = location.pathname !== "/";

  const backgroundProps = {
    backgroundImage: `url(
        'https://cdn.brandfolder.io/R30ALRIS/at/9w35qpfv6vmtnx7bn8s333/GettyImages-1350225561.jpg'
      )`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const getProps = () => {
    return displayImage ? backgroundProps : {};
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //...getProps(),
      }}
    >
      {children}
    </div>
  );
};
