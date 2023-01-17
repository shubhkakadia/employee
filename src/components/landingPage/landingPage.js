import React, { useEffect, useState } from "react";
import { userLogin } from "../state/actions/userLogin";
import "./landingPage.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../landingPage/loading";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.loggedInUser.load);
  const loggedInUser = useSelector((state) => state.loggedInUser.data);
  const navigate = useNavigate();

  function clear() {
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  function login(e) {
    e.preventDefault();
    const userObj = {
      Email: email,
      Password: password,
    };
    dispatch(userLogin(userObj));
    navigate("/dashboard");
    clear();
    // redirect();
  }

  function redirect() {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }

  function toggle(e) {
    const password = document.querySelector("#typePasswordX");
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    e.target.classList.toggle("bi-eye");
  }

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
              <div className="card bg-dark text-white loginCard shadow-lg shadow">
                <div className="card-body p-5 text-center card-h">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <form onSubmit={(e) => login(e)}>
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline mb-4 email">
                        <input
                          value={email}
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          value={password}
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg input-icons"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          className="bi bi-eye-slash eye input-icons"
                          id="togglePassword"
                          onClick={(e) => toggle(e)}
                        ></i>
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <Link className="text-white-50" to="/">
                          Forgot password?
                        </Link>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                      <div className="load">
                        {isLoading ? <Loading /> : <></>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
