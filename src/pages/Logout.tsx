import { useEffect } from "react";
import CustomButton from "../components/CustomButton";

const Logout = () => {

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      localStorage.removeItem("authToken");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <p>
        {localStorage.getItem("authToken")
          ? "Uloskirjautuminen onnistui"
          : "Et ole kirjautuneena sisään"}
      </p>
      <CustomButton type="Return" />
    </div>
  );
};

export default Logout;
