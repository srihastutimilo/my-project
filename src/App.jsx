import './App.css'
import ShoppingCart from './pages/DaftarBelanja'
import ExamScoreCalculator from './pages/FormNilai'
import MonthlySalesChart from './pages/Grafik'
import ProductInputForm from './pages/InputProduct'
import ProductManager from './pages/Product'

function App(){
  return(
    <>
      <ProductManager />
      <ProductInputForm />
      <ShoppingCart />
      <ExamScoreCalculator/>
      <MonthlySalesChart/>
    </>
  )
}

export default App
