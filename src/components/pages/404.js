import { useNavigate } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <ErrorMessage />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
        }}
      >
        Page doesn't exist
      </p>
      <button
        style={{
          display: 'block',
          width: "300px",
          height: '70px',
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          margin: '0 auto',
          marginTop: "30px",
        }}
        onClick={goBack}
      >
        Return to previous page
      </button>
    </div>
  );
};

export default Page404;
