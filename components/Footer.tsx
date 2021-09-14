export default function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between gap-3 px-20 py-4 bg-gray-100 text-sm items-center text-center">
      <div className="flex items-center gap-3 text-gray-500">
        <a href="https://mygrant.ca/disclaimer" className="text-blue-500 hover:text-blue-700 duration-200">
          Disclaimer
        </a>

        <p className="text-gray-300 text-sm">|</p>

        <a href="https://mygrant.ca/privacy-policy-2" className="text-blue-500 hover:text-blue-700 duration-200">
          Privacy Policy
        </a>

        <p className="text-gray-300 text-sm">|</p>

        <a href="https://mygrant.ca/environmental" className="text-blue-500 hover:text-blue-700 duration-200">
          Environmental
        </a>
      </div>

      <p className="text-gray-500 text-sm">Copyright &copy; 2021 MyGrant Canada.
        Made by
        {" "}
        <a className="text-blue-500 hover:text-blue-700 duration-200" href="https://aritrosaha.vercel.app/" target="_blank" rel="noreferrer">
          Aritro Saha
        </a>
        .
        All Rights Reserved.
      </p>
    </footer>
  );
}
