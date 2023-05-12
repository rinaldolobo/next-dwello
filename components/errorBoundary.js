import React from "react";
import HeaderKb from "@/components/headerKb";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, errorMessage: "Error!" };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
    this.setState({ error: error.message });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <HeaderKb headerStyle={"fixed"} />
          <div
            className={"container container-fluid"}
            style={{ marginTop: "100px", textAlign: "center" }}
          >
            <h1 style={{ fontSize: "90px" }}>Error!</h1>
            <p style={{ margin: "20px 0 30px" }}>{this.state.error}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                style={{
                  backgroundColor: "#80C341",
                  fontWeight: 500,
                  color: "#000000",
                  fontSize: "20px",
                  padding: "10px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  border: 0,
                }}
              >
                Try again?
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                style={{
                  marginLeft: "15px",
                  backgroundColor: "#ffffff",
                  fontWeight: 500,
                  color: "#000000",
                  fontSize: "20px",
                  padding: "10px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  border: "1px solid #cccccc",
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
