import "./App.css";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";

interface Accordion {
  title: string;
  content: string;
  uuid: string;
  permalink: string;
}

function App() {
  const [accordions, setAccordions] = useState<Accordion[]>([]);
  const params = new URLSearchParams(window.location.href);
  const status = params.get("status");
  const directus = new Directus("http://167.172.80.70:8055");

  useEffect(() => {
    const getData = async () => {
      // const filter = `?filter={ "status": { "_eq": "published" }}`
      const response = await directus.items("ssg_page_layout_1").readByQuery({
        filter: {
          uuid: { _eq: "614e1379-9ccc-4bcd-8bb5-a10ebdd3912b" },
        },
        fields: ["*", "blocks.*", "blocks.item.*", "*.collection"],
        limit: 1,
      });
      const contentBlocks = response?.data?.[0].blocks ?? [];
      const accordionArr = contentBlocks.map((block: any) => block.item);
      setAccordions(accordionArr);
    };
    getData();
  }, []);

  const handleGetUuid = (e: any) => {
    navigator.clipboard.writeText(e.target.dataset.uuid);
  };

  return (
    <>
      <h1>POC FE UI</h1>
      {accordions.length > 0 ? (
        accordions
          .filter(
            (a) =>
              a.permalink === window.location.pathname && status !== "published"
          )
          .map((a) => {
            return (
              <div key={a.uuid}>
                <p data-uuid={a.uuid} onClick={handleGetUuid}>
                  {a.title}
                </p>
                <p>{a.content}</p>
              </div>
            );
          })
      ) : (
        <h1>No accordions</h1>
      )}
    </>
  );
}

export default App;
