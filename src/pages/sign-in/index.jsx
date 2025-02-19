import { Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@validation";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { auth } from "@service";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../assets/login.jpg";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async values => {
    console.log(values);
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        console.log(response);
        Notification({ title: "Success", type: "success" });
        localStorage.setItem("access_token", response?.data?.access_token);
        setTimeout(() => {
          navigate("/main");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Error", type: "error" });
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${Login})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <ToastContainer />
      <div
        className="w-full h-screen flex items-center justify-center"
        style={backgroundImageStyle}
      >
        <div className="w-full sm:w-[600px] p-5 bg-white rounded-lg shadow-lg ">
          <h1 className="text-center my-6 text-4xl font-bold text-gray-800">
            Login
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className="mb-4"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className="mb-4"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  className="mb-2"
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>
                <Link
                  className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
                  onClick={() => navigate("/forgot-password")}
                >
                  forgot-password
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
