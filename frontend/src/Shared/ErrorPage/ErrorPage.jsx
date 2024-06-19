import { Link } from "react-router-dom";
import "./error.css";

const ErrorPage = () => {
  return (
<section className="lampContainer">
<div>
  <div class="starsec"></div>
  <div class="starthird"></div>
  <div class="starfourth"></div>
  <div class="starfifth"></div>
</div>

<div class="lamp__wrap">
  <div class="lamp">
    <div class="cable"></div>
    <div class="cover"></div>
    <div class="in-cover">
      <div class="bulb"></div>
    </div>
    <div class="light"></div>
  </div>
</div>
<section class="error">
  <div class="error__content">
    <div class="error__message message mt-40">
      <h1 class="message__title">Page Not Found</h1>
      <Link to="/">
        <button className="bg-[#2cffff3d] text-white px-4 py-2 rounded-md">Go Home</button>
      </Link>
    </div>
    <div class="error__nav e-nav">
    </div>
  </div>

</section>
</section>
  );
};

export default ErrorPage;