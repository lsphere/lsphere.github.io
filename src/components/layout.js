import NavBar from "./home/navbar";
import TopbarSection from "./home/topbar-section";

function Layout({ withLinks, children }) {
  return (
    <>
      <TopbarSection />
      <NavBar withLinks={withLinks} />
      {children}
    </>
  );
}

export default Layout;
