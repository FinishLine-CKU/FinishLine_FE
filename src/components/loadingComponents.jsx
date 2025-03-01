import { StyleSheet, css } from 'aphrodite';
import Lottie from "lottie-react";
import loadingLottie from "../assets/images/AnimationCKU.json";

function LoadingComponents() {

    return (
        <div className={css(styles.overlay)}>
            <div className={css(styles.loader)}>
                <Lottie animationData={loadingLottie} />
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        paddingTop: '60px'
    },
    loader: {
        width: '400px',
        height: '400px',
    },
});

export default LoadingComponents;