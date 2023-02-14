import { useCallback, useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Search from '../Search/search';
import Logo from '../Logo/logo';
import './index.css';
import SearchInfo from '../SearchInfo/search-info';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import Spinner from '../Spinner';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page'
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Modal from '../Modal/modal';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPassword } from '../ResetPassword/reset-password';
import { HomePage } from '../../pages/HomePage/home-page';
import { fetchChangeLikeProduct, fetchProducts } from '../../storage/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loggedIn, userTokenCheck } from '../../storage/user/userSlice';
import { ProtectedRoute } from '../ProtectedRoute/protected-route';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 200);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSortCard, setCurrentSortCard] = useState('');
  const [favoriteCard, setFavoriteCard] = useState([]);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }


  useEffect(() => {
    const token = localStorage.getItem('jwt');
   dispatch(userTokenCheck(token));
    if (token) {
      const userData = dispatch(fetchUser());
      userData.then(() => {
        dispatch(fetchProducts());
      })
    }
  }, [dispatch])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }


  const handleProductLike = useCallback((product) => {
    return dispatch(fetchChangeLikeProduct(product))
  }, [currentUser, cards])

  const sortedInfoCard = (currentSortCard) => {
    switch (currentSortCard) {
      case "low":
        setCards(cards.sort((a, b) => b.price - a.price)); break;
      case "cheap":
        setCards(cards.sort((a, b) => a.price - b.price)); break;
      case "sale":
        setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default:
        setCards(cards.sort((a, b) => a.price - b.price));
    }
  }
  return (

    // <UserContext.Provider value={{ user: currentUser }}>
    //   <CardContext.Provider value={{ cards, favorites,currentSort, handleLike: handleProductLike, onSortData: sortedData, setCurrentSort }}>
    <>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes >
            <Route path='/catalog' element={
              <Search
                onSubmit={handleFormSubmit}
                onInput={handleInputChange}
              />
            } />
            <Route path='*'
              element={<></>}
            />
          </Routes>
        </>
      </Header>
      <main className='content'>
        <SearchInfo searchText={searchQuery} />
        <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location} >
          <Route index element={
            <HomePage
            />} />
          <Route path='/catalog' element={
            <ProtectedRoute >
              <CatalogPage />
            </ProtectedRoute>
          } />
          <Route path='/product/:productId' element={
            <ProductPage
              isLoading={isLoading}
            />
          } />
          <Route path='/favorites' element={
            <ProtectedRoute >
              <FavoritePage />
            </ProtectedRoute>
          } />
          <Route path='/login' element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          } />
          <Route path='/reset-password' element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFoundPage />}
          />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path='/login' element={
              <ProtectedRoute onlyUnAuth>
                <Modal>
                  <Login />
                </Modal>
              </ProtectedRoute>
            } />
            <Route path='/register' element={
              <ProtectedRoute onlyUnAuth>
                <Modal>
                  <Register />
                </Modal>
              </ProtectedRoute>
            } />
            <Route path='/reset-password' element={
              <ProtectedRoute onlyUnAuth>
                <Modal>
                  <ResetPassword />
                </Modal>
              </ProtectedRoute>
            } />
          </Routes>
        )}
      </main>
      <Footer />
      {/* </CardContext.Provider>
    </UserContext.Provider> */}
    </>
  );
}

export default App;
