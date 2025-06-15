interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-muted min-h-svh flex-col flex justify-center items-center p-6 md:p-10">
      <div className="w-full m-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
};

export default Layout;
