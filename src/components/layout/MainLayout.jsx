function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}

export default MainLayout;