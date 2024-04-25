import {
  Button,
  Container,
  Grid,
  Image,
  SimpleGrid,
  Title
} from "@mantine/core";
import image from "../../../public/img/home/Bitmap.png";

import classes from "./CoachGrid.module.css";

export default function CoachGrid() {
  return (
    <div className={classes.bgblack}>
      <Container size="xl">
        <div className={classes.sectionsecond}>
          <Title
            style={{
              textAlign: "center",
              fontSize: "56px",
              color: "#fff",
              marginBottom: "30px",
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            COACHES
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>
            <Grid gutter="md" style={{ marginBottom: "15px" }}>
              <div className={classes.mainbx}>
                <div className={classes.toptext}>
                  <Image
                    src={image.src}
                    style={{ borderRadius: "5px" }}
                    alt="image"
                  />
                </div>
                <div>
                  <Button className={classes.bottext}> JOHN PHAM</Button>
                </div>
              </div>
            </Grid>
            <Grid gutter="md" style={{ marginBottom: "15px" }}>
              <div className={classes.mainbx}>
                <div className={classes.toptext}>
                  <Image
                    src={image.src}
                    style={{ borderRadius: "5px" }}
                    alt="image"
                  />
                </div>
                <div>
                  <Button className={classes.bottext}> JOHN PHAM</Button>
                </div>
              </div>
            </Grid>
            <Grid gutter="md" style={{ marginBottom: "15px" }}>
              <div className={classes.mainbx}>
                <div className={classes.toptext}>
                  <Image
                    src={image.src}
                    style={{ borderRadius: "5px" }}
                    alt="image"
                  />
                </div>
                <div>
                  <Button className={classes.bottext}> JOHN PHAM</Button>
                </div>
              </div>
            </Grid>
            <Grid gutter="md" style={{ marginBottom: "15px" }}>
              <div className={classes.mainbx}>
                <div className={classes.toptext}>
                  <Image
                    src={image.src}
                    style={{ borderRadius: "5px" }}
                    alt="image"
                  />
                </div>
                <div>
                  <Button className={classes.bottext}> JOHN PHAM</Button>
                </div>
              </div>
            </Grid>
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
}
