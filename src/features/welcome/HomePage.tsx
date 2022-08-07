import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/login')
        }}
      >
        Go to login
      </Button>
    </div>
  );
};

export default HomePage;
