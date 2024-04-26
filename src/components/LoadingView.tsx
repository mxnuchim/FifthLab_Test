import Lottie from "lottie-react";
import { animations } from "../assets/animations";

const { loading } = animations;

const LoadingView = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-50">
      <div className="w-24 h-24">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          animationData={loading}
        />
      </div>
    </div>
  );
};

export default LoadingView;
