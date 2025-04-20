import "@/styles/globals.css";
import Header from '../components/Header';
import '../styles/globals.css';
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <title>Smart Shop</title>
            <Header />
            <Component {...pageProps} />

        </>
    );
}

export default MyApp;

