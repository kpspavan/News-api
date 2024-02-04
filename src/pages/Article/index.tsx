import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Tabelcomponent from "../../component/Tablecomponent/Tablecomponent";
import { fetchArticles } from "../../../utils/api";
import withAuth from '../../../hocs/withAuth'

function Article({ articles, handleSignout }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  console.log("articlesishere", articles);

  return (
    <>
      <Navbar handleSignout={handleSignout} />
      <div>
        <h1>Top Business Headlines (US)</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Tabelcomponent articles={articles} />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const articles = await fetchArticles("news");

  return {
    props: {
      articles,
    },
  };
}

export default withAuth(Article);
