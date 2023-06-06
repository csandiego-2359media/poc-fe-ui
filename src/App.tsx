import './App.css'
import {useState, useEffect} from 'react';

interface Accordion {
    title: string;
    content: string;
}

function App() {
    const [accordions, setAccordions] = useState<Accordion[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://167.172.80.70:8055/items/acc001_application_status_and_processes');
            const jsonData = await response.json();
            setAccordions(jsonData.data);
        }
        getData();
    }, [])

  return (
    <>
      <h1>POC FE UI</h1>
        {
            accordions.length > 0 ? accordions.map(a => {
                return (
            <div>
            <p>{a.title}</p>
            <p>{a.content}</p>
            </div>
            )
        }) : <h1>No accordions</h1>
        }

    </>
  )
}

export default App
