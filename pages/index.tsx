import { useUser } from "@auth0/nextjs-auth0/client";
import FooterLinks from "./Footer/FooterLinks";
import HeaderMenu from "./Header/HeaderMenu";
import HomePage from "./home/HomePage";

export default function IndexPage() {
  const { user, checkSession, isLoading, error } = useUser();

  return (
    <>
      <HeaderMenu alwaysBlack={true} alwaysSticky={false}/>
      <HomePage/>
      <FooterLinks />
    </>
  );
}
