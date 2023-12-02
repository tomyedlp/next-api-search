import { AiOutlineLoading } from "react-icons/ai";

function LoadingPage({ small = false, textShow = "Cargando información...", mY = 10 }) {
  return (
    <div className="container mx-auto relative justify-self-center text-center">
      <div className={"loadingDivIcon flex justify-center my-"+mY}>
        <AiOutlineLoading size={small ? 50 : 100} />
      </div>
      <div className={small ? "text-sm": "text-lg"}>
        {textShow}
      </div>
    </div>
  )
}

export default LoadingPage