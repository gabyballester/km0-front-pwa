import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import imageSrc from "../assets/wellcome.svg";
import Layout from "../components/Layout";

function Wellcome() {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="mx-auto my-auto max-w-96">
          <div className="pt-10 mx-auto">
            <img src={imageSrc} alt="Wellcome Page" />
          </div>

          <div className="mt-10">
            <p className="text-4xl">
              <span className="mr-2 text-green-200">Better </span>
              Task Management
            </p>
            <p className="mt-4 text-gray-300 text-opacity-90">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
              hic sunt recusandae quaerat esse fugiat
            </p>
          </div>

          <div className="mt-5">
            <Link
              to="/tasks"
              className="flex gap-2 text-black bg-yellow-200 rounded-full w-fit"
            >
              <span className="inline-block pl-5 pr-3 my-auto">
                Get Started
              </span>
              <div className="p-4 m-1 text-white bg-black rounded-full">
                <IoArrowForward className="my-auto text-2xl text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Wellcome;
