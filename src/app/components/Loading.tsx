import { AiOutlineLoading } from "react-icons/ai";

function LoadingPage({ small = false }) {
  return (
    <div className="container mx-auto relative justify-self-center text-center">
      <div className="loadingDivIcon flex justify-center my-10">
        <AiOutlineLoading size={small ? 50 : 100} />
      </div>
      <div className={small ? "text-sm": "text-lg"}>
        Cargando información...
      </div>
    </div>
  )
}

export default LoadingPage