function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="app-container">
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
