import { Link } from "react-router-dom";

const SideNav = () => {
  const pages = [
    { name: "Koti", path: "/" },
    { name: "Tilat", path: "tilat" },
    { name: "Varaajat", path: "varaajat" },
    { name: "Varaukset", path: "varaukset" },
  ];

  return (
    <div className="flex flex-col gap-4 justify-items-start h-full min-w-2xl bg-blue-800">
      {pages.map((page) => (
        <Link to={page.path} />
      ))}
    </div>
  );
};

export default SideNav;
