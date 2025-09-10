"use client";
import { useState } from "react";
import { FaClock, FaFire, FaFacebook } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import Link from "next/link";
import { GiTimeTrap } from "react-icons/gi";
import { FaPhoenixFramework } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LOGIN_API, REGISTER_API } from "@/lib/Constant";
import axios from "axios";
import { toast } from "react-toastify";

export default function AuthForm() {
    const { Formik } = formik;
    const [isSignIn, setIsSignIn] = useState(true);

    // Schemas
    const signInSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const signUpSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "At least 6 chars").required("Password is required"),
    });

    const RegisterUser = async (values) => {
        try {
            const res = await axios.post(REGISTER_API, {
                name: values.name,
                email: values.email,
                password: values.password,
            });

            console.log("::user", res);
            toast.success(res.data?.message || "User registered successfully 🎉");
        } catch (error) {
            // ✅ use error.response, not res
            const errorMessage =
                error.response?.data?.message || error.message || "Registration failed";

            toast.error(errorMessage);
            console.error("register_api_error", error);
        }
    };
    const LoginUser = async (values) => {
        try {
            const res = await axios.post(LOGIN_API, {
                email: values.email,
                password: values.password,
            });

            console.log("::user", res);
            toast.success(res.data?.message || "User Login successfully");
            localStorage.setItem("token", res.data?.token);
            localStorage.setItem("login", 1);
        } catch (error) {
            //  use error.response, not res
            const errorMessage =
                error.response?.data?.message || error.message || "Registration failed";
            toast.error(errorMessage);
            console.error("register_api_error", error);
        }
    };


    return (
        <div className="auth-page font-roboto">
            <Container>
                <Row>
                    {/* Left Info Section */}
                    <Col lg={6} md={6} sm={12} className="d-flex flex-column justify-content-center align-items-center py-5">
                        <div style={{ maxWidth: "350px" }}>
                            <div className="display-6">Create a resume you are proud of</div>

                            <div className="d-flex align-items-center mt-3 text-color">
                                <GiTimeTrap className="me-3 icon-color fs-2" />
                                <p className="mb-0 fs-5">Save time with hassle-free templates</p>
                            </div>

                            <div className="d-flex align-items-center mt-3 text-color">
                                <FaPhoenixFramework className="me-2 icon-color display-4" />
                                <p className="mb-0 fs-5">Beat the competition using actionable, contextual advice</p>
                            </div>

                            <div className="d-flex align-items-center mt-3 text-color">
                                <FaFire className="me-3 icon-color fs-3" />
                                <p className="mb-0 fs-5">Highlight key achievements with memorable visuals</p>
                            </div>

                            <div className="mt-4">
                                Get inspired by{" "}
                                <a
                                    target="_blank"
                                    href="https://enhancv.com/resume-examples/"
                                    rel="noopener noreferrer"
                                    className="icon-color font-roboto text-decoration-none"
                                >
                                    1800+ Free Resume Examples and Templates
                                </a>
                            </div>
                        </div>
                    </Col>

                    {/* Right Auth Section */}
                    <Col lg={6} md={6} sm={12} className="d-flex flex-column justify-content-center align-items-center text-center py-5">
                        <Formik
                            validationSchema={isSignIn ? signInSchema : signUpSchema}
                            onSubmit={(values) => {
                                if (isSignIn) {
                                    LoginUser(values);
                                } else {
                                    RegisterUser(values);
                                }
                            }}
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "350px" }}>
                                    <h3 className="pb-3">{isSignIn ? "Sign in your account" : "Create your account"}</h3>

                                    {/* Name (only for SignUp) */}
                                    {!isSignIn && (
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                isInvalid={touched.name && !!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                        </Form.Group>
                                    )}

                                    {/* Email */}
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </Form.Group>

                                    {!isSignIn && <Form.Group className="mb-3 text-start">
                                        <Form.Check
                                            required
                                            name="terms"
                                            label={
                                                <>
                                                    I agree to{" "}
                                                    <a href="/terms" className="icon-color text-decoration-none">
                                                        Terms of Service
                                                    </a>{" "}
                                                    and{" "}
                                                    <a href="/privacy" className="icon-color text-decoration-none">
                                                        Privacy Policy
                                                    </a>
                                                    *
                                                </>
                                            }
                                            feedback="You must agree before submitting."
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>}


                                    {/* Submit */}
                                    <button type="submit" className="w-100 build-res-btn">
                                        {isSignIn ? "Sign In" : "Sign Up"}
                                    </button>

                                    {/* Divider */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="flex-grow-1 border-top border-dark"></div>
                                        <span className="mx-2 text-muted">or</span>
                                        <div className="flex-grow-1 border-top border-dark"></div>
                                    </div>

                                    {/* Social logins */}
                                    <div className="mt-3 d-flex justify-content-center gap-3">
                                        <FcGoogle size={30} />
                                        <FaFacebook size={30} className="text-primary" />
                                    </div>

                                    {/* Links */}
                                    <div className="py-3 text-center">
                                        {isSignIn ? (
                                            <>
                                                <div className="mb-2">
                                                    <Link href="/forgot-password" className="icon-color text-decoration-none">
                                                        Forgot your password?
                                                    </Link>
                                                </div>
                                                First time here?&nbsp;
                                                <span
                                                    role="button"
                                                    className="icon-color text-decoration-none"
                                                    onClick={() => setIsSignIn(false)}
                                                >
                                                    Create an account
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                Already have an account?&nbsp;
                                                <span
                                                    role="button"
                                                    className="icon-color text-decoration-none"
                                                    onClick={() => setIsSignIn(true)}
                                                >
                                                    Sign In
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
