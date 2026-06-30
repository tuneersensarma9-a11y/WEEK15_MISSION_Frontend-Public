import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://week15-mission-backend-public.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          formData
        ),
      }
    );

    const data =
      await res.json();

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      navigate(
        "/dashboard"
      );
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <button
        onClick={() =>
          navigate(
            "/register"
          )
        }
      >
        Go to Register
      </button>
    </div>
  );
}

export default Login;
