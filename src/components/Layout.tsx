import Header from "./Header";

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="app-container">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
