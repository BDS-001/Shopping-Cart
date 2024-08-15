import './styles/App.css'
import { Outlet } from "react-router-dom";
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

function App() {

  return (
    <>
      <PageHeader></PageHeader>
      <main>
        <Outlet />
      </main>
      <PageFooter></PageFooter>
    </>
  )
}

export default App
