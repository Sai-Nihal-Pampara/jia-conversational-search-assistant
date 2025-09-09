import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { JiaFAB } from './components/JiaFAB';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AccountPage } from './components/AccountPage';
import { CustomerServicePage } from './components/CustomerServicePage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { AboutUsPage } from './components/AboutUsPage';
import { PlaceholderPage } from './components/PlaceholderPage';

import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import useLocalStorage from './hooks/useLocalStorage';
import { getFashionResults } from './services/geminiService';
import type { Product, CartItem, Order, ShippingInfo, JiaResponse, User, Wishlist, WishlistItem, View } from './types';
import { JiaStatus } from './types';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [jiaStatus, setJiaStatus] = useState<JiaStatus>(JiaStatus.Idle);
  const [view, setView] = useState<View>({ page: 'home' });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // --- PERSISTENT DATA HOOKS ---
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [wishlists, setWishlists] = useLocalStorage<Wishlist[]>('wishlists', []);
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>('currentUserId', null);
  
  // --- DERIVED STATE ---
  const currentUser = users.find(u => u.id === currentUserId) || null;
  const userCart = currentUser?.cart || [];
  
  // --- NAVIGATION ---
  const navigateTo = (newView: View) => {
    window.scrollTo(0, 0);
    setView(newView);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  }

  // --- BAG (CART) HANDLERS ---
  const addToCart = (productToAdd: Product) => {
    if (!currentUser) {
        navigateTo({ page: 'login', from: 'product' });
        return;
    }
    const existingItem = currentUser.cart.find(item => item.id === productToAdd.id);
    let newCart: CartItem[];
    if (existingItem) {
        newCart = currentUser.cart.map(item =>
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        newCart = [...currentUser.cart, { ...productToAdd, quantity: 1 }];
    }
    updateUser({ ...currentUser, cart: newCart });
    alert(`${productToAdd.name} added to bag!`);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (!currentUser) return;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      const newCart = currentUser.cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateUser({ ...currentUser, cart: newCart });
    }
  };

  const removeFromCart = (productId: string) => {
    if (!currentUser) return;
    const newCart = currentUser.cart.filter(item => item.id !== productId);
    updateUser({ ...currentUser, cart: newCart });
  };

  // --- WISHLIST HANDLERS ---
  const handleAddToWishlist = (product: Product) => {
    if (!currentUser) {
      navigateTo({ page: 'login', from: 'product' });
      return;
    }
    const userWishlist = wishlists.find(w => w.userId === currentUser.id) || { id: `WISH-${currentUser.id}`, userId: currentUser.id, name: 'My Wishlist', items: [] };
    const isAlreadyInWishlist = userWishlist.items.some(item => item.productId === product.id);

    if (isAlreadyInWishlist) {
      alert('This item is already in your wishlist!');
      return;
    }

    const newItem: WishlistItem = { productId: product.id, addedAt: new Date().toISOString() };
    const updatedWishlist = { ...userWishlist, items: [...userWishlist.items, newItem] };
    setWishlists(prev => [...prev.filter(w => w.userId !== currentUser.id), updatedWishlist]);
    alert(`${product.name} added to your wishlist!`);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    if (!currentUser) return;
    const userWishlist = wishlists.find(w => w.userId === currentUser.id);
    if (!userWishlist) return;

    const updatedItems = userWishlist.items.filter(item => item.productId !== productId);
    const updatedWishlist = { ...userWishlist, items: updatedItems };
    setWishlists(prev => [...prev.filter(w => w.userId !== currentUser.id), updatedWishlist]);
  };

  const handleMoveToBag = (product: Product) => {
    if (!currentUser) return;
    const productToAdd = MOCK_PRODUCTS.find(p => p.id === product.id);
    if (productToAdd) {
        addToCart(productToAdd);
        handleRemoveFromWishlist(product.id);
    }
  };
  
  // --- ORDER & AUTHENTICATION HANDLERS ---
  const placeOrder = (shippingInfo: ShippingInfo, paymentMethod: 'Online' | 'Cash on Delivery') => {
    if (!currentUser) return;
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      userId: currentUser.id,
      items: currentUser.cart,
      shippingInfo,
      total: currentUser.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      paymentMethod,
      date: new Date().toISOString(),
      status: 'Placed',
    };
    setOrders(prev => [...prev, newOrder]);
    setLastOrder(newOrder);
    updateUser({ ...currentUser, cart: [] });
    navigateTo({ page: 'confirmation' });
  };
  
  const handleLogin = (email: string, password: string): boolean => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
          setCurrentUserId(user.id);
          const fromPage = (view as { page: 'login'; from?: string }).from;
          if (fromPage === 'cart') navigateTo({ page: 'cart' });
          else if (fromPage === 'checkout') navigateTo({ page: 'checkout' });
          else if (fromPage === 'account') navigateTo({ page: 'account', subpage: 'home' });
          else navigateTo({ page: 'home' });
          return true;
      }
      return false;
  };

  const handleSignup = (details: Omit<User, 'id' | 'cart'>): boolean => {
      if (users.some(u => u.email === details.email)) {
          alert("An account with this email already exists.");
          return false;
      }
      const newUser: User = {
          id: `USER-${Date.now()}`,
          ...details,
          cart: [],
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUserId(newUser.id);
      navigateTo({ page: 'home' });
      return true;
  };
  
  const handleLogout = () => {
      setCurrentUserId(null);
      navigateTo({ page: 'home' });
  };

  const handleUpdateProfile = (updatedDetails: Partial<User>) => {
      if (!currentUser) return;
      updateUser({ ...currentUser, ...updatedDetails });
      alert("Profile updated successfully!");
  }

  const handleSearchSubmit = (query: string) => {
    navigateTo({ page: 'search', payload: query });
  };

  // --- VOICE QUERY HANDLER ---
  const handleVoiceQuery = useCallback(async (query: string) => {
    if (!query) {
      setJiaStatus(JiaStatus.Idle);
      return;
    }
    setJiaStatus(JiaStatus.Thinking);
    try {
      const result: JiaResponse = await getFashionResults(query, MOCK_PRODUCTS);
      
      if (result.navigationTarget) {
        navigateTo(result.navigationTarget);
      } else if (result.products && result.products.length > 0) {
        setProducts(result.products);
        navigateTo({ page: 'home' });
      } else if (result.responseMessage) {
        alert(result.responseMessage);
      } else {
        throw new Error("Sorry, I couldn't understand that.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(errorMessage);
      alert(`Error: ${errorMessage}`);
      setJiaStatus(JiaStatus.Error);
    } finally {
        setTimeout(() => setJiaStatus(JiaStatus.Idle), 500);
    }
  }, [MOCK_PRODUCTS]);

  const { isListening, startListening, stopListening, error: voiceError } = useVoiceRecognition({ onStop: handleVoiceQuery });
  
  // --- LIFECYCLE EFFECTS ---
  useEffect(() => {
    if (isListening) setJiaStatus(JiaStatus.Listening);
    else if (jiaStatus === JiaStatus.Listening) setJiaStatus(JiaStatus.Idle);
  }, [isListening, jiaStatus]);

  useEffect(() => {
    if (voiceError) {
      alert(`Voice Recognition Error: ${voiceError}`);
      setJiaStatus(JiaStatus.Error);
      setTimeout(() => setJiaStatus(JiaStatus.Idle), 3000);
    }
  }, [voiceError]);

  const handleFabClick = () => isListening ? stopListening() : startListening();

  // --- PAGE ROUTING & RENDERING ---
  const renderContent = () => {
    switch (view.page) {
      case 'home':
        return <ProductGrid products={products} onProductClick={(id) => navigateTo({ page: 'product', payload: id })} title="Trending Styles" />;
      case 'about':
        return <AboutUsPage />;
      case 'category':
        return <CategoryPage gender={(view as any).payload} allProducts={MOCK_PRODUCTS} navigateTo={navigateTo} />;
      case 'product':
        const product = MOCK_PRODUCTS.find(p => p.id === (view as any).payload);
        return product ? <ProductDetailPage product={product} addToCart={addToCart} navigateTo={navigateTo} currentUser={currentUser} handleAddToWishlist={handleAddToWishlist} /> : <div>Product not found</div>;
      case 'cart':
        if (!currentUser) return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} fromPage="cart" />;
        return <CartPage cartItems={userCart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} navigateTo={navigateTo} />;
      case 'checkout':
        if (!currentUser) return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} fromPage="checkout" />;
        return <CheckoutPage cartItems={userCart} placeOrder={placeOrder} navigateTo={navigateTo} />;
      case 'confirmation':
        return lastOrder ? <OrderConfirmationPage order={lastOrder} allProducts={MOCK_PRODUCTS} navigateTo={navigateTo}/> : <div>Order not found</div>;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} fromPage={(view as any).from} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onNavigate={navigateTo} />;
      case 'account':
        if (!currentUser) return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} fromPage="account" />;
        return (
            <AccountPage
                view={view}
                navigateTo={navigateTo}
                currentUser={currentUser}
                orders={orders.filter(o => o.userId === currentUser.id)}
                wishlists={wishlists.filter(w => w.userId === currentUser.id)}
                allProducts={MOCK_PRODUCTS}
                onUpdateProfile={handleUpdateProfile}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onMoveToBag={handleMoveToBag}
            />
        );
      case 'customer-service':
        return <CustomerServicePage currentUser={currentUser} navigateTo={navigateTo} />;
      case 'search':
        return <SearchResultsPage searchQuery={(view as any).payload} allProducts={MOCK_PRODUCTS} navigateTo={navigateTo} />;
      case 'placeholder':
        return <PlaceholderPage title={(view as any).payload} />;
      default:
        return <ProductGrid products={products} onProductClick={(id) => navigateTo({ page: 'product', payload: id })} title="Discover Your Style" />;
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Header 
        onNavigate={navigateTo} 
        cartCount={userCart.reduce((sum, item) => sum + item.quantity, 0)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className="max-w-screen-2xl mx-auto flex-grow w-full">
        {renderContent()}
      </main>
      <Footer onNavigate={navigateTo} />
      <JiaFAB status={jiaStatus} onClick={handleFabClick} />
    </div>
  );
};

export default App;

