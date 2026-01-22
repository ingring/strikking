import './App.css'
import Strikkeprosjekter from "./sider/Strikkeprosjekt.tsx";

export type Prosjekt = {
    id: number;
    tittel?: string;
    bilde?: string;
};

function App() {

    return (
        <>
        <Strikkeprosjekter />
        </>
    );
}

export default App;