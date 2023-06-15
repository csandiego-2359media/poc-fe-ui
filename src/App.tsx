import "./App.css";
import { useState, useEffect } from "react";
import { Directus } from "@directus/sdk";
import { Header, Menu, Button, IconButton, Icon, Row, Col } from "@molb/gobiz-styleguide";
import styled from "styled-components";
import { MenuOption } from "@molb/gobiz-styleguide/src/components/menu/components/MenuHeader";

const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: 24px;
  }
`;

const TitleSection = styled.section`
  background-color: #037e8a;
  color: #ffffff;
  padding: 36px 48px;

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

  > h1 {
    color: inherit;
    margin-top: 24px;
  }
`;

const MainSection = styled.section`
  padding: 80px 48px 0px 48px;
;`

const SideNav = styled.section`
  nav > ul {
    list-style-type: none;
  }

  nav > ul > li > a {
    border-bottom: 1px solid #323232;
    color: #323232;
    display: block;
    font-size: 16px;
    padding: 12px 0px;
    text-decoration: none;
  }

  nav > ul > li > a:hover,
  nav > ul > li > a.selected {
    color: #037e8a;
  }

  nav > ul > li > a.selected {
    font-weight: 600;
  }
  `;

const ContentSection = styled.section`
  padding-left: 48px;

  p {
    margin-top: 32px;
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
        label: "Overview",
        sublevel: false,
      }, {
        key: "/",
        label: "Home-Based Businesses",
        sublevel: false,
      }, {
        key: "/",
        label: "Key Steps to Start a Business",
        sublevel: false,
      }, {
        key: "/",
        label: "Next Steps to Consider",
        sublevel: false,
      }, {
        key: "/",
        label: "FAQ",
        sublevel: false,
      }
    ],
  }, {
    key: '/',
    label: 'Run and Grow a Business',
    icon: 'Licence',
    submenu: [
      {
        key: "/",
        label: "Overview",
        sublevel: false,
      }, {
        key: "/",
        label: "Government Assistance",
        sublevel: false,
      }, {
        key: "/",
        label: "Business Grants Portal",
        sublevel: false,
      }, {
        key: "/",
        label: "Licences and Permits",
        sublevel: false,
      }, {
        key: "/",
        label: "SkillsFuture for Enterprise",
        sublevel: false,
      }, {
        key: "/",
        label: "Accreditation",
        sublevel: false,
      }, {
        key: "/",
        label: "Taxes, GST and Customs",
        sublevel: false,
      }, {
        key: "/",
        label: "GeBIZ Alerts",
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
        label: "No more",
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
        label: "Stop looking",
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
        label: "So kaypoh...",
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
        label: "HALO POLIS!",
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
    <Menu optionList={optionList} selectedKeys={[]} onClick={() => { }} mode="horizontal" />
    <Button label="Login" size="medium" />
    <IconButton onClick={() => { }}>
      <Icon.Search />
    </IconButton>
  </HeaderContent>;

  return (
    <>
      <Header childComponent={nav} />
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
      <MainSection>
        <Row gutter={0}>
          <Col span={2}>
            <SideNav>
              <nav>
                <ul>
                  <li><a href="#" className="selected">Enterprise Portal for Jobs and Skills</a></li>
                  <li><a href="#">Programmes and Initiatives</a></li>
                  <li><a href="#">Resources and Toolkits</a></li>
                  <li><a href="#">Digital Services</a></li>
                </ul>
              </nav>
            </SideNav>
          </Col>
          <Col span={10}>
            <ContentSection>
              <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit sagittis ultricies.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum neque velit, eget bibendum neque hendrerit id. Nunc cursus, lorem vitae venenatis dictum, ligula neque ornare arcu, vel condimentum turpis neque sed ligula. Cras vitae est scelerisque, gravida mi sed, lobortis nunc. Nam elementum ornare nunc, eget dictum enim faucibus eget. Praesent a nibh at libero eleifend faucibus. Phasellus porttitor nulla non sem placerat, ac consequat mi commodo. Integer varius massa vel turpis aliquet, et interdum ipsum maximus. Ut interdum lacinia nibh tempus ornare. Sed posuere pretium massa, quis porttitor sapien aliquam vitae. Aliquam at magna at nibh ullamcorper posuere sit amet ut est. Nullam accumsan mollis neque vel tincidunt.
              </p>
              <p>
                Proin id dolor et leo feugiat mattis vel sed eros. Morbi gravida venenatis turpis, nec faucibus nisl tempor sit amet. Aliquam erat volutpat. Nullam consectetur ac erat sed luctus. Praesent a vestibulum nisl. Suspendisse potenti. Nullam rhoncus odio et turpis varius, id tempor nunc suscipit. Proin lacus arcu, feugiat sed risus non, vestibulum volutpat elit. Vestibulum fringilla ante lorem, in tincidunt sapien auctor quis. Vivamus velit est, molestie non ullamcorper sit amet, tincidunt at odio. Maecenas at lobortis urna. Nullam imperdiet egestas consectetur. Suspendisse maximus arcu et tellus posuere, a iaculis enim dictum. Donec ac sem aliquam, venenatis mauris at, ornare felis.
              </p>
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
                <p>(No accordions)</p>
              )}
            </ContentSection>
          </Col>
        </Row>
      </MainSection>
    </>
  );
}

export default App;
