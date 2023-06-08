import './App.css'
import {useState, useEffect} from 'react';

interface Accordion {
    title: string;
    content: string;
    uuid: string;
    permalink: string;
}

function App() {
    const [accordions, setAccordions] = useState<Accordion[]>([]);
    const params = new URLSearchParams(window.location.href);
    const status = params.get('status');

    useEffect(() => {
        console.log(window.location.pathname);
        const getData = async () => {
            // const filter = `?filter={ "status": { "_eq": "published" }}`
            const response = await fetch(`http://167.172.80.70:8055/items/ssg_accordion`);
            const jsonData = await response.json();
            setAccordions(jsonData.data);
        }
        getData();
    }, [])

    const handleGetUuid = (e: any) => {
        console.log('handleGetUuid', e.target.dataset.uuid);
        navigator.clipboard.writeText(e.target.dataset.uuid);
    }

  return (
    <>
      <h1>POC FE UI</h1>
        {
            accordions.length > 0 ? accordions.filter(a => (a.permalink === window.location.pathname && status !== 'published')).map(a => {
                return (
            <div>
            <p data-uuid={a.uuid} onClick={handleGetUuid}>{a.title}</p>
            <p>{a.content}</p>
            </div>
            )
        }) : <h1>No accordions</h1>
        }

    </>
  )
}

export default App
