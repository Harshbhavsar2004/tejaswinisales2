import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import { BrowserRouter , Routes ,Route} from 'react-router-dom'
import Shop from './Pages/Shop.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import ShopCategory from './Pages/ShopCategory.jsx'
import LoginSignup from './Pages/LoginSignup.jsx'
import Footer from './components/Footer/Footer.jsx'
import men_banner from './components/Assests/banner_mens.png'
import women_banner from './components/Assests/banner_women.png'
import kids_banner from './components/Assests/banner_kids.png'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/Store' element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route path='/About' element={<About/>} />
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Product' element={<Product/>}> 
      <Route path=':productId' element={<Product/>}/>
      </Route>
      

      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
      
        
    </>
  )
}

export default App
