import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:site_name" content="https://dwello.in" />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
