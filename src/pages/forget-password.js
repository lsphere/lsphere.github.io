import React, { useState } from "react";
import Layout from "../components/layout";
import "../styles/auth.css";
export default function ForgetPassword(props) {
  const [verifiedCode, setVerifiedCode] = useState(false);
  return (
    <Layout withLinks={false}>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">
              {!verifiedCode ? "Forget Password" : "Change Password"}
            </h3>

            {!verifiedCode ? (
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <div>
                <div className="form-group mt-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="New Password"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            )}

            <div className="d-grid gap-2 mt-3 mb-2">
              <button type="submit" className="btn btn-primary">
                {!verifiedCode ? "Send Code" : "Change Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
