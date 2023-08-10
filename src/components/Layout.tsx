export const Layout = ({ children }: any) => {
  return (
    <div
      style={{
        maxWidth: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
