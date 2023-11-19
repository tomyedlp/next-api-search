import { AiOutlineLoading } from "react-icons/ai";

function LoadingPage() {
  return (
    <div className="mx-auto relative justify-self-center text-center">
      <div className="loadingDivIcon flex justify-center my-10">
        <AiOutlineLoading size={100} />
      </div>
      <div className="text-lg">
        Cargando información...
      </div>
    </div>
  )
}

export default LoadingPage