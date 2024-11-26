import React from "react";
import { useParams } from "react-router-dom";
import { useDynamicPageData } from "../UseDynamicPage";
import Page from "../routeuitils/dynamicpages/Page";

const DynamicPage: React.FC = () => {
  const { DynamicPageData } = useDynamicPageData();

  const hasRoutes = DynamicPageData && DynamicPageData?.length > 0 ? DynamicPageData : [];

  const { pathdynamic } = useParams<{ pathdynamic: string }>();

  const findedPageData = hasRoutes.find((route) => {
    return route.path === pathdynamic;
  });

  return (
    <main className="dynamic-page-wrapper">
      <Page findedPageData={findedPageData ? findedPageData : ""} />
    </main>
  );
};

export default DynamicPage;
