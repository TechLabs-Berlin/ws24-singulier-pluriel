import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function MainCard({ title }) {
  const navigate = useNavigate();
  // Function to handle card click (navigate to path)
  const handleCardClick = () => {
    let path = "/";
    switch (title) {
      case "Courses":
        path = "/courses";
        break;
      case "Communication":
        path = "/communication";
        break;
      case "Announcements":
        path = "/announcements";
        break;
      case "Grade Center":
        path = "/grade-center";
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default MainCard;
