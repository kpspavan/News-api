import { useEffect, useState, FC, ComponentType } from "react";
import { useRouter } from "next/router";

interface WithAuthProps {
  isLoggedIn: boolean;
  handleSignout: () => void;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const WithAuth: FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(!!isLoggedIn);
      setIsLoading(false);

      console.log("Current Path:", router.pathname);
      console.log("Current AsPath:", router.asPath);

      if (!isLoggedIn && router.pathname !== "/Login") {
        console.log("isLoggedIn Redirecting to login...");
        router.push("/Login");

        if (isLoggedIn && router.pathname === "/Signup") {
          console.log(
            "Clearing isLoggedIn after login and changing route to signin..."
          );
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
        }
      }
    }, [router]);

    const handleSignout = () => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      router.push("/Login");
    };

    if (isLoading) {
      return <div>Checking Authentication...</div>;
    }

    return (
      <WrappedComponent
        {...props}
        isLoggedIn={isLoggedIn}
        handleSignout={handleSignout}
      />
    );
  };

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
