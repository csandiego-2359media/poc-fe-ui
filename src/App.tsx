import "./App.css";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import { Header, Menu, Button } from "@molb/gobiz-styleguide";
import styled from "styled-components";
import { MenuOption } from "@molb/gobiz-styleguide/src/components/menu/components/MenuHeader";

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const TitleSection = styled.section`
  background-color: #037e8a;
  color: #ffffff;
  padding: 36px 48px 36px 48px;

  nav > ul {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-start
    list-style-type: none;
  }

  nav > ul > li {
    display: flex;
  }

  nav > ul > li+li::before {
    content: "/";
    padding: 10px 0px;
  }

  nav > ul > li > a {
    color: #ffffff;
    display: block;
    font-size: 15px;
    padding: 10px 15px;
    text-decoration: none;
  }

  nav > ul > li:first-child > a {
    padding: 10px 15px 10px 0px;
  }

  nav > ul > li > a:hover {
    color: #d6d6d6;
  }

  h1 {
    font-family: hknova-semibold;
    font-size: 48px;
    font-weight: 600;
    margin-top: 24px;
  }
`;

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
  const directus = new Directus(import.meta.env.DIRECTUS_SERVER);
  const optionList: MenuOption[] = [{
    key: '/',
    label: 'Start a Business',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }, {
    key: '/',
    label: 'Run and Grow a Business',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }, {
    key: '/',
    label: 'Covid-19',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }, {
    key: '/',
    label: 'e-Services',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }, {
    key: '/',
    label: 'Resources',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }, {
    key: '/',
    label: 'About Us',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Sample",
        sublevel: false,
      },
    ],
  }];

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

  const nav = <HeaderContent>
    <Menu optionList={optionList} selectedKeys={[]} onClick={() => {}} mode="horizontal"/>
    <Button label="Login" size="medium" />
  </HeaderContent>;

  return (
    <>
      <Header childComponent={nav}/>
      <TitleSection>
        <nav>
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">EPJS</a></li>
            <li><a href="#">PROGRAMMES AND INITIATIVES</a></li>
            <li><a href="#">DEVELOP HUMAN CAPITAL</a></li>
          </ul>
        </nav>
        <h1>Develop Human Capital</h1>
      </TitleSection>
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
