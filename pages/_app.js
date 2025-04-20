import "@/styles/globals.css";
import Header from '../components/Header';
import '../styles/globals.css';
import Footer from "@/components/Footer";
import { UserProvider } from '../contexts/userContext';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserProvider><title>Smart Shop</title>
                <Header />
                <main className="pt-16 min-h-screen bg-gray-900 text-white"> {/* Adjust pt-16 to match navbar height */}
                    <Component {...pageProps} />
                </main>
            </UserProvider>


        </>
    );
}

export default MyApp;

