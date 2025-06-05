import CustomButton from "../components/CustomButton";
import { useState } from "react";
import type { resJson } from "../utils/Types";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../utils/AuthProvider";

const Login = () => {
  const initValues = {
    tunnus: "",
    salasana: "",
  };

  const [loginData, setLoginData] = useState(initValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  //const { login } = useAuth();
  const navigate = useNavigate();

  //name ja value ovat <input>-elementin attribuutteja (esim. name="tunnus", value="user@example.com")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doLogin();
    setLoginData(initValues);
  };

  const doLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const token = response.headers.get("Authorization");
      if (token) {
        //Tallennetaan tokeni ilman "Bearer "-alkuosaa käyttäjän selaimen välimuistiin ja contextiin
        const cleanToken = token.replace("Bearer ", "");
        localStorage.setItem("authToken", cleanToken);
        //login(cleanToken);
        console.log("Token received", localStorage.getItem("authToken"));
      } else {
        console.log("No Token found in the response headers.");
      }

      const resJson: resJson = await response.json();
      console.log(resJson);
      navigate("/");
    } catch (error: any) {
      setError(error)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {loading ? (
        <p>Logging in...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          id="login_form"
          className="flex flex-col bg-foreground rounded-2xl p-10 shadow-md min-w-xl"
        >
          <h3 className="text-center text-4xl mb-6">Kirjautuminen</h3>
          <label className="mb-1">Tunnus</label>
          <input
            required
            id="tunnus"
            name="tunnus"
            type="email"
            value={loginData.tunnus}
            onChange={handleChange}
            className="mb-2 border-zinc-500 border-1 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:shadow-lg focus:border-transparent focus:ring-primary"
          ></input>
          <label className="mb-1">Salasana</label>
          <input
            required
            id="salasana"
            name="salasana"
            type="password"
            value={loginData.salasana}
            onChange={handleChange}
            className="mb-6 border-zinc-500 border-1 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:shadow-lg focus:border-transparent focus:ring-primary"
          ></input>
          <input
            id="submit"
            name="submit"
            type="submit"
            className="mb-2 bg-primary p-1 rounded-md"
          ></input>
        </form>
      )}
      <CustomButton type="Return" />
    </div>
  );
};

export default Login;
